import { IconArrowDown, IconCalendar } from "@/common";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormProvider,
} from "@/components/__form__";
import { Button } from "@/components/button";
import { TextField } from "@/components/input";
import { EditInvoiceItemsDesktop } from "@/components/invoice.items.edit.desktop";
import { EditInvoiceItemsMobile } from "@/components/invoice.items.edit.mobile";
import { Label } from "@/components/label";
import { Text } from "@/components/text";
import { db } from "@/database/db.server";
import { invariant } from "@/helpers/invariant";
import {
  approximate,
  calculateTotal,
  hasValues,
  numberGuard,
  omitFields,
  pluralize,
  tw,
} from "@/helpers/utils";
import {
  AddressSchema,
  EmailContraint,
  ItemSchema,
  StringContraint,
} from "@/lib/schema";
import { getAuth } from "@clerk/remix/ssr.server";
import { Listbox, Transition } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData, useParams } from "@remix-run/react";
import { format } from "date-fns";
import { Fragment } from "react";
import { getValidatedFormData, useRemixForm } from "remix-hook-form";
import {
  redirectWithError,
  redirectWithSuccess,
  redirectWithWarning,
} from "remix-toast";
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
});
const resolver = zodResolver(schema);

export async function action(args: ActionFunctionArgs) {
  const params = args.params;
  const request = args.request;
  invariant(params.slug, "Missing slug parameter");

  const { userId } = await getAuth(args);
  if (!userId)
    return redirectWithWarning(
      "/sign-in?redirect_url=" + args.request.url,
      "Invalid Session. Please sign in",
    );

  const {
    errors,
    data,
    receivedValues: defaultValues,
  } = await getValidatedFormData<FormData>(request, resolver);

  if (errors) return json({ errors, defaultValues });

  const duration = numberGuard(data.paymentTerms, 1) * 24 * 3600 * 1000;
  const dueTime = duration + Date.parse(data.issued);

  const invoice = {
    ...data,
    paymentDue: new Date(dueTime).toISOString(),
    total: approximate(calculateTotal(data?.items, "total"), 2),
    userId: userId,
  };

  try {
    await db.invoice.update({
      where: { slug: args.params.slug, userId },
      data: invoice,
    });

    return redirectWithSuccess(
      `/invoices/${invoice.slug}`,
      `Invoice #${invoice.slug?.toUpperCase()} Edit Success`,
    );
  } catch (ex: any) {
    return redirectWithError(`/invoices`, `Request Failed`);
  }
}

export async function loader(args: LoaderFunctionArgs) {
  invariant(args.params.slug, "Missing slug parameter");

  const { userId } = await getAuth(args);
  if (!userId)
    return redirectWithWarning(
      "/sign-in?redirect_url=" + args.request.url,
      "Invalid Session. Please sign in",
    );

  const response = await db.invoice.findUnique({
    where: { slug: args.params.slug, userId },
  });

  if (!response)
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });

  const invoice = omitFields(response, ["createdAt", "updatedAt", "id"]);

  return json({ invoice: invoice });
}

export type FormData = z.infer<typeof schema>;

function PageRoute() {
  const params = useParams();
  const data = useLoaderData<typeof loader>();

  const { invoice } = data;

  const form = useRemixForm<FormData>({
    mode: "onSubmit",
    resolver: resolver,

    defaultValues: {
      paymentTerms: invoice?.paymentTerms || 1,
      status: "pending",
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

  return (
    <main aria-labelledby="page-heading" className="relative w-full">
      <div className="mt-12 flex flex-col gap-8 lg:mt-16">
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit}
            className={tw("flex flex-col gap-8")}
          >
            <header className="container">
              <Text as="h1" id="page-heading" size="xl" weight="bold">
                Edit&nbsp;<span className="text-brand-400">#</span>
                <span className="uppercase">{params.slug}</span>
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
                          <FormLabel>Issued Date</FormLabel>

                          <FormControl>
                            <Button
                              disabled
                              className="inline-flex w-full items-center justify-between border border-brand-100 bg-transparent px-5 py-4 text-brand-900 outline-none hocus:border-brand-500 dark:border-brand-600 dark:bg-brand-700 dark:text-white dark:hocus:border-brand-500"
                            >
                              <span className="block truncate">
                                {format(new Date(field.value), "dd MMM yyyy")}
                              </span>

                              <span className="pointer-events-none">
                                <IconCalendar aria-hidden className="" />
                              </span>
                            </Button>
                          </FormControl>
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
                                className="inline-flex w-full items-center justify-between border border-brand-100 bg-transparent px-5 py-4 text-brand-900 outline-none hocus:border-brand-500 dark:border-brand-600 dark:bg-brand-700 dark:text-white dark:hocus:border-brand-500"
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

            <footer className="sticky bottom-0 z-20 w-full bg-white p-6 shadow-300 dark:bg-brand-700">
              <div className="container">
                <div className="flex items-center gap-2 sm:gap-4">
                  <Button variant="soft" className="ms-auto " asChild>
                    <Link to={`/invoices/${invoice.slug}`}>Cancel</Link>
                  </Button>

                  <Button type="submit" variant="primary">
                    Save Changes
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
