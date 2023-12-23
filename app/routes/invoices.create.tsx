import { IconArrowDown, IconArrowLeft, IconCalendar } from "@/common";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/__form__";
import { Button } from "@/components/button";
import { DatePicker } from "@/components/datepicker";
import { TextField } from "@/components/input";
import { CreateInvoiceItemsDesktop } from "@/components/invoice.items.create.desktop";
import { CreateInvoiceItemsMobile } from "@/components/invoice.items.create.mobile";
import { Label } from "@/components/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover";
import { Text } from "@/components/text";
import { monthsAgo, pluralize, tw } from "@/helpers/utils";
import { Listbox, Transition } from "@headlessui/react";
import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { Fragment } from "react";
import { useInput } from "react-day-picker";

const terms = [1, 7, 14, 30];

function PageRoute() {
  const actionData = useActionData<typeof action>();

  const { inputProps, dayPickerProps } = useInput({
    defaultSelected: new Date(),
    fromYear: new Date().getFullYear() - 1,
    toYear: new Date().getFullYear(),
    format: "dd MMM yyyy",
    required: true,
  });

  return (
    <main aria-labelledby="page-heading" className="relative w-full">
      <div className="mt-12 flex flex-col gap-8 lg:mt-16">
        <div className="container">
          <Button className="h-auto w-auto gap-x-3" asChild>
            <Link to="/invoices">
              <span>
                <IconArrowLeft />
              </span>
              <span>Go Back</span>
            </Link>
          </Button>
        </div>

        <Form method="POST" className={tw("flex flex-col gap-8")}>
          <header className="container">
            <Text as="h1" id="heading" size="xl">
              New Invoice
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
                  <FormItem
                    // error={actionData?.errors?.senderAddress?.street}
                    className="col-span-6"
                  >
                    <div className="flex items-center justify-between">
                      <FormLabel>Street Address</FormLabel>
                      <FormMessage />
                    </div>

                    <FormControl>
                      <TextField
                        type="text"
                        name="senderAddress.street"
                        placeholder="19 Union Terrace"
                        autoComplete="street-address"
                      />
                    </FormControl>
                  </FormItem>

                  <FormItem
                    // error={actionData?.errors?.senderAddress?.city}
                    className="col-span-3 max-3xs:col-span-6 sm:col-span-2"
                  >
                    <div className="flex items-center justify-between">
                      <FormLabel>City</FormLabel>
                      <FormMessage />
                    </div>

                    <FormControl>
                      <TextField
                        type="text"
                        name="senderAddress.city"
                        placeholder="London"
                        autoComplete="address-level2"
                      />
                    </FormControl>
                  </FormItem>

                  <FormItem className="col-span-3 max-3xs:col-span-6 sm:col-span-2">
                    <div className="flex items-center justify-between">
                      <FormLabel>Post Code</FormLabel>
                      <FormMessage />
                    </div>

                    <FormControl>
                      <TextField
                        type="text"
                        name="senderAddress.postCode"
                        placeholder="E1 3EZ"
                        autoComplete="postal-code"
                      />
                    </FormControl>
                  </FormItem>

                  <FormItem className="col-span-6 sm:col-span-2">
                    <div className="flex items-center justify-between">
                      <FormLabel>Country</FormLabel>
                      <FormMessage />
                    </div>

                    <FormControl>
                      <TextField
                        type="text"
                        name="senderAddress.country"
                        placeholder="United Kingdom"
                        autoComplete="country-name"
                      />
                    </FormControl>
                  </FormItem>
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
                  <FormItem className="col-span-6">
                    <div className="flex items-center justify-between">
                      <FormLabel>Client&apos;s Name</FormLabel>
                      <FormMessage />
                    </div>

                    <FormControl>
                      <TextField
                        type="text"
                        name="clientName"
                        placeholder="Alex Grim"
                        autoComplete="name"
                      />
                    </FormControl>
                  </FormItem>

                  <FormItem className="col-span-6">
                    <div className="flex items-center justify-between">
                      <FormLabel>Client&apos;s Email</FormLabel>
                      <FormMessage />
                    </div>

                    <FormControl>
                      <TextField
                        type="text"
                        name="clientEmail"
                        placeholder="e.g. alexgrim@mail.com"
                        autoComplete="email"
                      />
                    </FormControl>
                  </FormItem>
                </div>

                <div className="grid grid-cols-6 gap-5">
                  <FormItem className="col-span-6">
                    <div className="flex items-center justify-between">
                      <FormLabel>Street Address</FormLabel>
                      <FormMessage />
                    </div>

                    <FormControl>
                      <TextField
                        type="text"
                        name="clientAddress.street"
                        placeholder="84 Church Way"
                        autoComplete="street-address"
                      />
                    </FormControl>
                  </FormItem>

                  <FormItem className="col-span-3 max-3xs:col-span-6 sm:col-span-2">
                    <div className="flex items-center justify-between">
                      <FormLabel>City</FormLabel>
                      <FormMessage />
                    </div>

                    <FormControl>
                      <TextField
                        type="text"
                        name="clientAddress.city"
                        placeholder="Bradford"
                        autoComplete="address-level2"
                      />
                    </FormControl>
                  </FormItem>

                  <FormItem className="col-span-3 max-3xs:col-span-6 sm:col-span-2">
                    <div className="flex items-center justify-between">
                      <FormLabel>Post Code</FormLabel>
                      <FormMessage />
                    </div>

                    <FormControl>
                      <TextField
                        type="text"
                        name="clientAddress.postCode"
                        placeholder="BD1 9PB"
                        autoComplete="postal-code"
                      />
                    </FormControl>
                  </FormItem>

                  <FormItem className="col-span-6 sm:col-span-2">
                    <div className="flex items-center justify-between">
                      <FormLabel>Country</FormLabel>
                      <FormMessage />
                    </div>

                    <FormControl>
                      <TextField
                        type="text"
                        name="clientAddress.country"
                        placeholder="United Kingdom"
                        autoComplete="country-name"
                      />
                    </FormControl>
                  </FormItem>
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
                  <FormItem className="relative col-span-6 flex flex-col sm:col-span-3">
                    <FormLabel>Invoice Issued Date</FormLabel>

                    <Popover>
                      <PopoverTrigger asChild>
                        <div className="relative">
                          <FormControl>
                            <TextField
                              {...inputProps}
                              className="inline-flex w-full cursor-pointer items-center justify-between border border-brand-100 bg-transparent px-5 py-4 text-brand-900 outline-none hover:border-brand-500 focus:border-brand-500 dark:border-brand-600 dark:bg-brand-700 dark:text-white dark:hover:border-brand-500 dark:focus:border-brand-500"
                              placeholder="Pick a date"
                              readOnly
                            />
                          </FormControl>

                          <span className="pointer-events-none absolute right-4 top-1/3">
                            <IconCalendar aria-hidden className="" />
                          </span>
                        </div>
                      </PopoverTrigger>

                      <PopoverContent className="mt-2" align="start">
                        <DatePicker
                          {...dayPickerProps}
                          mode="single"
                          initialFocus={true}
                          // selected={field.value}
                          // onSelect={field.onChange}
                          disabled={(date) => date < monthsAgo(new Date(), 3)}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>

                  <Listbox name="paymentTerms" defaultValue={terms[0]}>
                    <FormItem className="relative col-span-6 flex-col sm:col-span-3">
                      <Listbox.Label as={Label}>Payment Terms</Listbox.Label>

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

                  <FormItem className="col-span-6">
                    <div className="flex items-center justify-between">
                      <FormLabel>Product Description</FormLabel>
                      <FormMessage />
                    </div>

                    <FormControl>
                      <TextField
                        type="text"
                        name="description"
                        placeholder="e.g. Graphic Design Service"
                      />
                    </FormControl>
                  </FormItem>
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

                <CreateInvoiceItemsMobile className="flex sm:hidden" />
                <CreateInvoiceItemsDesktop className="hidden sm:flex" />
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
                  name="status"
                  value="draft"
                  variant="secondary"
                  className="ms-auto"
                >
                  Save as draft
                </Button>

                <Button
                  type="submit"
                  name="status"
                  value="pending"
                  variant="primary"
                >
                  Save & Send
                </Button>
              </div>
            </div>
          </footer>
        </Form>
      </div>
    </main>
  );
}

export default PageRoute;

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const errors = {};

  if (Object.keys(errors).length > 0) {
    return json({ errors });
  }

  // Redirect to dashboard if validation is successful
  return redirect("/invoices");
}
