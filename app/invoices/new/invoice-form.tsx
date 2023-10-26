'use client';

import { icons } from '@/common';
import {
  Button,
  Calendar,
  Container,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  TextField,
} from '@/components';
import { cn, pluralize } from '@/helpers';
import { useApiState, useZodForm, type RHFormSubmitHandler } from '@/hooks';
import { Listbox, Transition } from '@headlessui/react';
import { format } from 'date-fns';
import NextLink from 'next/link';
import { Fragment, useEffect } from 'react';
import { schema } from './common';
import InvoiceItemsDesktop from './invoice.items.desktop';
import InvoiceItemsMobile from './invoice.items.mobile';

const terms = [1, 7, 14, 30];

interface Props {
  className?: string;
}

export default function InvoiceForm({ className }: Props) {
  const form = useZodForm({
    schema: schema,
    defaultValues: {
      clientName: '',
      clientEmail: '',
      clientAddress: { street: '', city: '', postCode: '', country: '' },
      senderAddress: { street: '', city: '', postCode: '', country: '' },
      description: '',
      items: [],

      issued: new Date(),
      paymentDue: new Date(),
      paymentTerms: 1,
      total: 0,
      status: 'pending',
    },
    mode: 'onChange',
  });

  const { startTransition } = useApiState();

  const {
    handleSubmit,
    register,
    reset,
    watch,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = form;

  const statusValue = watch('status');
  const paymentTermsValue = watch('paymentTerms');

  useEffect(() => {
    register('status');
    register('paymentTerms');
  }, [register]);

  const onSubmit: RHFormSubmitHandler<typeof schema> = async (data) => {
    console.log(data);

    const result = schema.safeParse(data);

    if (result.success) {
      console.log('result.data', result.data);
    } else {
      console.log('result.error', result.error);
    }
    //  reset()
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('flex flex-col gap-8', className)}
      >
        <header>
          <Container>
            <Text as='h1' id='heading' size='xl'>
              New Invoice
            </Text>
          </Container>
        </header>

        <section className='flex flex-col gap-12'>
          {/*<!--------- SENDER DETAILS START ---------!>*/}
          <Container>
            <fieldset className='> * + * space-y-5'>
              <Text
                as='legend'
                variant='brand'
                weight='bold'
                className='col-span-6'
              >
                Bill From
              </Text>

              <div className='grid grid-cols-6 gap-5'>
                <FormField
                  name='senderAddress.street'
                  render={({ field }) => (
                    <FormItem className='col-span-6'>
                      <div className='flex items-center justify-between'>
                        <FormLabel>Street Address</FormLabel>
                        <FormMessage />
                      </div>

                      <FormControl>
                        <TextField
                          type='text'
                          placeholder='19 Union Terrace'
                          autoComplete='street-address'
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  name='senderAddress.city'
                  render={({ field }) => (
                    <FormItem className='col-span-3 max-3xs:col-span-6 sm:col-span-2'>
                      <div className='flex items-center justify-between'>
                        <FormLabel>City</FormLabel>
                        <FormMessage />
                      </div>

                      <FormControl>
                        <TextField
                          type='text'
                          placeholder='London'
                          autoComplete='address-level2'
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  name='senderAddress.postCode'
                  render={({ field }) => (
                    <FormItem className='col-span-3 max-3xs:col-span-6 sm:col-span-2'>
                      <div className='flex items-center justify-between'>
                        <FormLabel>Post Code</FormLabel>
                        <FormMessage />
                      </div>

                      <FormControl>
                        <TextField
                          type='text'
                          placeholder='E1 3EZ'
                          autoComplete='postal-code'
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  name='senderAddress.country'
                  render={({ field }) => (
                    <FormItem className='col-span-3 max-3xs:col-span-6 sm:col-span-2'>
                      <div className='flex items-center justify-between'>
                        <FormLabel>Country</FormLabel>
                        <FormMessage />
                      </div>

                      <FormControl>
                        <TextField
                          type='text'
                          placeholder='United Kingdom'
                          autoComplete='country-name'
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </fieldset>
          </Container>
          {/*<!--------- SENDER DETAILS END ---------!>*/}

          {/*<!--------- CLIENT DETAILS START ---------!>*/}
          <Container>
            <fieldset className='> * + * space-y-5'>
              <Text
                as='legend'
                variant='brand'
                weight='bold'
                className='col-span-6'
              >
                Bill To
              </Text>

              <div className='grid grid-cols-6 gap-5'>
                <FormField
                  name='clientName'
                  render={({ field }) => (
                    <FormItem className='col-span-6'>
                      <div className='flex items-center justify-between'>
                        <FormLabel>Client&apos;s Name</FormLabel>
                        <FormMessage />
                      </div>

                      <FormControl>
                        <TextField
                          type='text'
                          placeholder='Alex Grim'
                          autoComplete='name'
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  name='clientEmail'
                  render={({ field }) => (
                    <FormItem className='col-span-6'>
                      <div className='flex items-center justify-between'>
                        <FormLabel>Client&apos;s Email</FormLabel>
                        <FormMessage />
                      </div>

                      <FormControl>
                        <TextField
                          type='text'
                          placeholder='e.g. alexgrim@mail.com'
                          autoComplete='email'
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className='grid grid-cols-6 gap-5'>
                <FormField
                  name='clientAddress.street'
                  render={({ field }) => (
                    <FormItem className='col-span-6'>
                      <div className='flex items-center justify-between'>
                        <FormLabel>Street Address</FormLabel>
                        <FormMessage />
                      </div>

                      <FormControl>
                        <TextField
                          type='text'
                          placeholder='84 Church Way'
                          autoComplete='street-address'
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  name='clientAddress.city'
                  render={({ field }) => (
                    <FormItem className='col-span-3 max-3xs:col-span-6 sm:col-span-2'>
                      <div className='flex items-center justify-between'>
                        <FormLabel>City</FormLabel>
                        <FormMessage />
                      </div>

                      <FormControl>
                        <TextField
                          type='text'
                          placeholder='Bradford'
                          autoComplete='address-level2'
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  name='clientAddress.postCode'
                  render={({ field }) => (
                    <FormItem className='col-span-3 max-3xs:col-span-6 sm:col-span-2'>
                      <div className='flex items-center justify-between'>
                        <FormLabel>Post Code</FormLabel>
                        <FormMessage />
                      </div>

                      <FormControl>
                        <TextField
                          type='text'
                          placeholder='BD1 9PB'
                          autoComplete='postal-code'
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  name='clientAddress.country'
                  render={({ field }) => (
                    <FormItem className='col-span-3 max-3xs:col-span-6 sm:col-span-2'>
                      <div className='flex items-center justify-between'>
                        <FormLabel>Country</FormLabel>
                        <FormMessage />
                      </div>

                      <FormControl>
                        <TextField
                          type='text'
                          placeholder='United Kingdom'
                          autoComplete='country-name'
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </fieldset>
          </Container>
          {/*<!--------- CLIENT DETAILS END ---------!>*/}

          {/*<!--------- PAYMENT DETAILS START ---------!>*/}
          <Container>
            <fieldset className='> * + * space-y-5'>
              <Text as='legend' className='sr-only'>
                Product Meta
              </Text>

              <div className='grid grid-cols-6 gap-6'>
                <FormField
                  name='issued'
                  render={({ field }) => (
                    <FormItem className='relative col-span-6 flex flex-col sm:col-span-3'>
                      <FormLabel>Invoice Date</FormLabel>

                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              className='peer inline-flex w-full items-center justify-between px-5 py-4 text-brand-900 outline-none hover:border-brand-500 focus:border-brand-500 dark:border-brand-600 dark:bg-brand-700 dark:text-white dark:hover:border-brand-500 dark:focus:border-brand-500'
                              // className={cn(
                              //   'flex w-full items-center justify-between'
                              //   // !field.value && 'text-muted-foreground'
                              // )}
                            >
                              {field.value ? (
                                <span className='block truncate'>
                                  {format(field.value, 'PPP')}
                                </span>
                              ) : (
                                <span>Pick a date</span>
                              )}

                              <span className='pointer-events-none'>
                                <icons.form.calendar aria-hidden className='' />
                              </span>
                            </Button>
                          </FormControl>
                        </PopoverTrigger>

                        <PopoverContent className='w-auto p-0' align='start'>
                          <Calendar
                            mode='single'
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date('1900-01-01')
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />

                <Listbox
                  value={paymentTermsValue}
                  onChange={(value) => setValue('paymentTerms', value)}
                  name='paymentTerms'
                >
                  <FormItem className='relative col-span-6 flex-col sm:col-span-3'>
                    <Listbox.Label as={Label}>Payment Terms</Listbox.Label>

                    <div className='relative z-[1] mt-1'>
                      <Listbox.Button
                        title='select a payment term'
                        as={Button}
                        className='peer inline-flex w-full items-center justify-between px-5 py-4 text-brand-900 outline-none hover:border-brand-500 focus:border-brand-500 dark:border-brand-600 dark:bg-brand-700 dark:text-white dark:hover:border-brand-500 dark:focus:border-brand-500'
                      >
                        {({ value }) => (
                          <>
                            <span className='block truncate'>
                              Net {value} {pluralize('Day', value)}
                            </span>

                            <span className='pointer-events-none'>
                              <icons.chevron.down
                                aria-hidden
                                className='transform-gpu transition-transform ui-open:-rotate-180'
                              />
                            </span>
                          </>
                        )}
                      </Listbox.Button>

                      <Transition
                        as={Fragment}
                        enter='transition-opacity ease-in-out duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='transition-opacity ease-in-out duration-300'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                      >
                        <Listbox.Options className='absolute z-20 mt-2 w-full divide-y divide-brand-100 rounded-lg bg-white shadow-200 transition-all duration-500 dark:divide-brand-600 dark:bg-brand-700 dark:shadow-300'>
                          {terms.map((term) => (
                            <Listbox.Option
                              key={term.toString()}
                              className='px-5 py-4 font-bold text-brand-900 ui-selected:text-brand-500 ui-active:text-brand-500 dark:text-brand-100 dark:ui-selected:text-brand-500 dark:ui-active:text-brand-500'
                              value={term}
                            >
                              <span className='block truncate text-400 leading-200 -tracking-200'>
                                Net {term} {pluralize('Day', term)}
                              </span>
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </FormItem>
                </Listbox>

                <FormField
                  name='description'
                  render={({ field }) => (
                    <FormItem className='col-span-6'>
                      <div className='flex items-center justify-between'>
                        <FormLabel>Product Description</FormLabel>
                        <FormMessage />
                      </div>

                      <FormControl>
                        <TextField
                          type='text'
                          placeholder='e.g. Graphic Design Service'
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </fieldset>
          </Container>
          {/*<!--------- PAYMENT DETAILS END ---------!>*/}

          {/*<!--------- INVOICE ITEM LIST DETAILS START ---------!>*/}

          <Container>
            <fieldset className='> * + * space-y-5'>
              <Text
                as='legend'
                weight='bold'
                className='col-span-6 text-[1.125rem] leading-8 -tracking-[0.32px] text-[#777F98]'
              >
                Item List
              </Text>

              <>
                <InvoiceItemsMobile className='flex sm:hidden' />
                <InvoiceItemsDesktop className='hidden sm:flex' />
              </>
            </fieldset>
          </Container>

          {/*<!--------- INVOICE ITEM LIST DETAILS END ---------!>*/}
        </section>

        <footer className='sticky bottom-0 w-full bg-white p-6 shadow-300 dark:bg-brand-700'>
          <Container>
            <div className='flex items-center gap-2 sm:gap-4'>
              <Button variant='soft' asChild>
                <NextLink href='/invoices'>Discard</NextLink>
              </Button>
              <Button
                type='submit'
                variant='secondary'
                className='ms-auto '
                onClick={() => void setValue('status', 'draft')}
              >
                Save as draft
              </Button>

              <Button
                type='submit'
                variant='primary'
                onClick={() => void setValue('status', 'pending')}
              >
                Save & Send
              </Button>
            </div>
          </Container>
        </footer>
      </form>
    </Form>
  );
}
