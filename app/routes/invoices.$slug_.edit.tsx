import { IconArrowDown, IconArrowLeft, IconCalendar } from "@/common";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormProvider,
} from "@/components/__form__";
import { Button } from "@/components/button";
import { DatePicker } from "@/components/datepicker";
import { TextField } from "@/components/input";
import { EditInvoiceItemsDesktop } from "@/components/invoice.items.edit.desktop";
import { EditInvoiceItemsMobile } from "@/components/invoice.items.edit.mobile";
import { Label } from "@/components/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover";
import { Text } from "@/components/text";
import { invariant } from "@/helpers/invariant";
import {
  approximate,
  calculateTotal,
  hasValues,
  pluralize,
  safeNum,
  tw,
} from "@/helpers/utils";
import {
  AddressSchema,
  EmailContraint,
  ItemSchema,
  StringContraint,
} from "@/lib/schema";
import { useUser } from "@clerk/remix";
import { getAuth } from "@clerk/remix/ssr.server";
import { Listbox, Transition } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Link, useLoaderData, useParams } from "@remix-run/react";
import { format } from "date-fns";
import { Fragment, useEffect } from "react";
import { getValidatedFormData, useRemixForm } from "remix-hook-form";
import { z } from "zod";

const terms = [1, 7, 14, 30];

const schema = z.object({
  paymentTerms: z.coerce.number().int().nonnegative(),
  status: z.string(),
  total: z.coerce.number().nonnegative(),

  clientName: StringContraint,
  clientEmail: EmailContraint,
  clientAddress: AddressSchema,
  senderAddress: AddressSchema,

  issued: z.coerce.date().transform((value) => value.toISOString()),
  description: StringContraint,
  items: ItemSchema.array().nonempty(),

  slug: z.string(),
  userId: z.string(),
});
const resolver = zodResolver(schema);

export async function action(args: ActionFunctionArgs) {
  const params = args.params;
  const request = args.request;
  invariant(params.slug, "Missing slug parameter");

  const payload = params.slug;

  const { userId } = await getAuth(args);
  if (!userId) return redirect("/sign-in?redirect_url=" + request.url);

  const {
    errors,
    data,
    receivedValues: defaultValues,
  } = await getValidatedFormData<FormData>(request, resolver);

  if (errors) return json({ errors, defaultValues });

  const updated = { ...data, paymentDue: "", total: 0, userId };

  const duration = safeNum(data.paymentTerms, 1) * 24 * 3600 * 1000;
  const dueTime = duration + Date.parse(data.issued);

  updated.paymentDue = new Date(dueTime).toISOString();
  updated.total = approximate(calculateTotal(updated?.items, "total"), 2);

  console.log(updated);

  // try {
  //   return redirect(`/invoices/${payload}`);
  // } catch (ex) {
  //   if (ex instanceof Error) console.error(ex.message);

  //   //@ts-expect-error
  //   throw new Response(ex.message, {
  //     status: 400,
  //     statusText: "Bad Request",
  //   });
  // }

  return json({ data });
}

export async function loader({ params }: LoaderFunctionArgs) {
  invariant(params.slug, "Missing slug parameter");
  const payload = params.slug;

  const invoices = await import("../database/db.json").then(
    (response) => response.default,
  );

  const invoice = invoices.find((item) => item.slug === payload);
  if (!invoice)
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });

  return json({ invoice: invoice });
}

export type FormData = z.infer<typeof schema>;

function PageRoute() {
  const params = useParams();
  const { user } = useUser();

  const data = useLoaderData<typeof loader>();

  const { invoice } = data;

  const form = useRemixForm<FormData>({
    mode: "onSubmit",
    resolver: resolver,

    defaultValues: {
      paymentTerms: invoice?.paymentTerms || 1,
      status: invoice?.status || "pending",
      total: invoice?.total || 0,

      clientName: invoice?.clientName || "",
      clientEmail: invoice?.clientEmail || "",
      clientAddress: { ...(invoice.clientAddress || {}) },
      senderAddress: { ...(invoice.senderAddress || {}) },

      description: invoice?.description || "",
      issued: new Date(invoice.issued).toISOString() || "",
      items: hasValues(invoice?.items) ? invoice?.items : [],

      slug: invoice?.slug,
    },
  });

  const { handleSubmit, register, setValue } = form;

  useEffect(() => {
    register("status");
  }, [register]);

  return (
    <main aria-labelledby="page-heading" className="relative w-full">
      <div className="mt-12 flex flex-col gap-8 lg:mt-16">
        <div className="container">
          <Button className="h-auto w-auto gap-x-3" asChild>
            <Link to={`/invoices/${params.slug}`}>
              <span>
                <IconArrowLeft />
              </span>
              <span>Go Back</span>
            </Link>
          </Button>
        </div>

        <FormProvider {...form}>
          <form onSubmit={handleSubmit} className={tw("flex flex-col gap-8")}>
            <header className="container">
              <Text as="h1" id="heading" size="xl">
                Edit #{params.slug}
              </Text>
            </header>

            <section className="flex flex-col gap-12">
              {/*<!--------- SENDER DETAILS START ---------!>*/}
              <div className="container">
                <fieldset className="space-y-5">
                  <Text as="legend" variant="brand" weight="bold">
                    Bill From
                  </Text>

                  <div className="grid grid-cols-6 gap-5">
                    <FormField
                      name="senderAddress.street"
                      render={({ field }) => (
                        <FormItem className="col-span-6">
                          <div className="flex items-center justify-between">
                            <FormLabel>Street Address</FormLabel>
                            <FormMessage />
                          </div>

                          <FormControl>
                            <TextField
                              type="text"
                              placeholder="19 Union Terrace"
                              autoComplete="street-address"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      name="senderAddress.city"
                      render={({ field }) => (
                        <FormItem className="col-span-3 max-3xs:col-span-6 sm:col-span-2">
                          <div className="flex items-center justify-between">
                            <FormLabel>City</FormLabel>
                            <FormMessage />
                          </div>

                          <FormControl>
                            <TextField
                              type="text"
                              placeholder="London"
                              autoComplete="address-level2"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      name="senderAddress.postCode"
                      render={({ field }) => (
                        <FormItem className="col-span-3 max-3xs:col-span-6 sm:col-span-2">
                          <div className="flex items-center justify-between">
                            <FormLabel>Post Code</FormLabel>
                            <FormMessage />
                          </div>

                          <FormControl>
                            <TextField
                              type="text"
                              placeholder="E1 3EZ"
                              autoComplete="postal-code"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      name="senderAddress.country"
                      render={({ field }) => (
                        <FormItem className="col-span-6 sm:col-span-2">
                          <div className="flex items-center justify-between">
                            <FormLabel>Country</FormLabel>
                            <FormMessage />
                          </div>

                          <FormControl>
                            <TextField
                              type="text"
                              placeholder="United Kingdom"
                              autoComplete="country-name"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </fieldset>
              </div>
              {/*<!--------- SENDER DETAILS END ---------!>*/}
              {/*<!--------- CLIENT DETAILS START ---------!>*/}
              <div className="container">
                <fieldset className="space-y-5">
                  <Text as="legend" variant="brand" weight="bold">
                    Bill To
                  </Text>

                  <div className="grid grid-cols-6 gap-5">
                    <FormField
                      name="clientName"
                      render={({ field }) => (
                        <FormItem className="col-span-6">
                          <div className="flex items-center justify-between">
                            <FormLabel>Client&apos;s Name</FormLabel>
                            <FormMessage />
                          </div>

                          <FormControl>
                            <TextField
                              type="text"
                              placeholder="Alex Grim"
                              autoComplete="name"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      name="clientEmail"
                      render={({ field }) => (
                        <FormItem className="col-span-6">
                          <div className="flex items-center justify-between">
                            <FormLabel>Client&apos;s Email</FormLabel>
                            <FormMessage />
                          </div>

                          <FormControl>
                            <TextField
                              type="email"
                              placeholder="e.g. alexgrim@mail.com"
                              autoComplete="email"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-6 gap-5">
                    <FormField
                      name="clientAddress.street"
                      render={({ field }) => (
                        <FormItem className="col-span-6">
                          <div className="flex items-center justify-between">
                            <FormLabel>Street Address</FormLabel>
                            <FormMessage />
                          </div>

                          <FormControl>
                            <TextField
                              type="text"
                              placeholder="84 Church Way"
                              autoComplete="street-address"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      name="clientAddress.city"
                      render={({ field }) => (
                        <FormItem className="col-span-3 max-3xs:col-span-6 sm:col-span-2">
                          <div className="flex items-center justify-between">
                            <FormLabel>City</FormLabel>
                            <FormMessage />
                          </div>

                          <FormControl>
                            <TextField
                              type="text"
                              placeholder="Bradford"
                              autoComplete="address-level2"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      name="clientAddress.postCode"
                      render={({ field }) => (
                        <FormItem className="col-span-3 max-3xs:col-span-6 sm:col-span-2">
                          <div className="flex items-center justify-between">
                            <FormLabel>Post Code</FormLabel>
                            <FormMessage />
                          </div>

                          <FormControl>
                            <TextField
                              type="text"
                              placeholder="BD1 9PB"
                              autoComplete="postal-code"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      name="clientAddress.country"
                      render={({ field }) => (
                        <FormItem className="col-span-6 sm:col-span-2">
                          <div className="flex items-center justify-between">
                            <FormLabel>Country</FormLabel>
                            <FormMessage />
                          </div>

                          <FormControl>
                            <TextField
                              type="text"
                              placeholder="United Kingdom"
                              autoComplete="country-name"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </fieldset>
              </div>
              {/*<!--------- CLIENT DETAILS END ---------!>*/}

              {/*<!--------- PAYMENT DETAILS START ---------!>*/}
              <div className="container">
                <fieldset className="space-y-5">
                  <Text as="legend" className="sr-only">
                    Product Payment Meta
                  </Text>

                  <div className="grid grid-cols-6 gap-6">
                    <FormField
                      name="issued"
                      render={({ field }) => (
                        <FormItem className="relative col-span-6 flex flex-col sm:col-span-3">
                          <FormLabel>Invoice Issued Date</FormLabel>

                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button className="inline-flex w-full items-center justify-between border border-brand-100 bg-transparent px-5 py-4 text-brand-900 outline-none hover:border-brand-500 focus:border-brand-500 dark:border-brand-600 dark:bg-brand-700 dark:text-white dark:hover:border-brand-500 dark:focus:border-brand-500">
                                  {field.value ?
                                    <span className="block truncate">
                                      {format(
                                        new Date(field.value),
                                        "dd MMM yyyy",
                                      )}
                                    </span>
                                  : <span>Pick a date</span>}

                                  <span className="pointer-events-none">
                                    <IconCalendar aria-hidden className="" />
                                  </span>
                                </Button>
                              </FormControl>
                            </PopoverTrigger>

                            <PopoverContent className="mt-2" align="start">
                              <DatePicker
                                mode="single"
                                initialFocus={true}
                                selected={field.value}
                                onSelect={field.onChange}
                              />
                            </PopoverContent>
                          </Popover>
                        </FormItem>
                      )}
                    />

                    <FormField
                      name="paymentTerms"
                      render={({ field }) => (
                        <Listbox {...field}>
                          <FormItem className="relative col-span-6 flex-col sm:col-span-3">
                            <Listbox.Label as={Label}>
                              Payment Terms
                            </Listbox.Label>

                            <div className="relative z-[1]">
                              <Listbox.Button
                                title="select a payment term"
                                as={Button}
                                className="inline-flex w-full items-center justify-between border border-brand-100 bg-transparent px-5 py-4 text-brand-900 outline-none hover:border-brand-500 focus:border-brand-500 dark:border-brand-600 dark:bg-brand-700 dark:text-white dark:hover:border-brand-500 dark:focus:border-brand-500"
                              >
                                {({ value }) => (
                                  <>
                                    <span className="block truncate">
                                      Net {value} {pluralize("Day", value)}
                                    </span>

                                    <span className="pointer-events-none">
                                      <IconArrowDown
                                        aria-hidden
                                        className="ui-open:-rotate-180 transform-gpu transition-transform"
                                      />
                                    </span>
                                  </>
                                )}
                              </Listbox.Button>

                              <Transition
                                as={Fragment}
                                enter="transition-opacity ease-in-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition-opacity ease-in-out duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                              >
                                <Listbox.Options className="absolute z-20 mt-2 w-full divide-y divide-brand-100 rounded-lg bg-white shadow-200 transition-all duration-500 dark:divide-brand-600 dark:bg-brand-700 dark:shadow-300">
                                  {terms.map((term) => (
                                    <Listbox.Option
                                      key={term.toString()}
                                      className="ui-selected:text-brand-500 ui-active:text-brand-500 dark:ui-selected:text-brand-500 dark:ui-active:text-brand-500 px-5 py-4 font-bold text-brand-900 outline-none dark:text-brand-100"
                                      value={term}
                                    >
                                      <span className="block truncate text-400 leading-200 -tracking-200">
                                        Net {term} {pluralize("Day", term)}
                                      </span>
                                    </Listbox.Option>
                                  ))}
                                </Listbox.Options>
                              </Transition>
                            </div>
                          </FormItem>
                        </Listbox>
                      )}
                    />

                    <FormField
                      name="description"
                      render={({ field }) => (
                        <FormItem className="col-span-6">
                          <div className="flex items-center justify-between">
                            <FormLabel>Product Description</FormLabel>
                            <FormMessage />
                          </div>

                          <FormControl>
                            <TextField
                              type="text"
                              placeholder="e.g. Graphic Design Service"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </fieldset>
              </div>
              {/*<!--------- PAYMENT DETAILS END ---------!>*/}

              {/*<!--------- INVOICE ITEM LIST DETAILS START ---------!>*/}
              <div className="container">
                <fieldset className="space-y-5">
                  <Text
                    as="legend"
                    weight="bold"
                    className="text-lg leading-8 -tracking-[0.32px] text-[#777F98]"
                  >
                    Item List
                  </Text>

                  <EditInvoiceItemsMobile className="flex sm:hidden" />
                  <EditInvoiceItemsDesktop className="hidden sm:flex" />
                </fieldset>
              </div>
              {/*<!--------- INVOICE ITEM LIST DETAILS END ---------!>*/}
            </section>

            <footer className="sticky bottom-0 w-full bg-white p-6 shadow-300 dark:bg-brand-700">
              <div className="container">
                <div className="flex items-center gap-2 sm:gap-4">
                  <Button variant="soft" asChild>
                    <Link to="/invoices">Discard</Link>
                  </Button>

                  <Button
                    type="submit"
                    variant="secondary"
                    className="ms-auto "
                    onClick={() => void setValue("status", "draft")}
                  >
                    Save as draft
                  </Button>

                  <Button
                    type="submit"
                    variant="primary"
                    onClick={() => void setValue("status", "pending")}
                  >
                    Save & Send
                  </Button>
                </div>
              </div>
            </footer>
          </form>
        </FormProvider>
      </div>
    </main>
  );
}

export default PageRoute;