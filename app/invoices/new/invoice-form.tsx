'use client';

import {
  Button,
  Container,
  Form,
  FormControl,
  FormHelperText,
  FormLabel,
  Text,
  TextField,
} from '@/components';
import { useApiState, useZodForm, type RHFormSubmitHandler } from '@/hooks';
// import { Controller } from 'react-hook-form';
import NextLink from 'next/link';
import { schema } from './common';
import { icons } from '@/common';
import InvoiceItemsDesktop from './invoice.items.desktop';
import InvoiceItemsMobile from './invoice.items.mobile';
import {
  calculateTotal,
  endsWith,
  cn,
  approximate,
  pluralize,
} from '@/helpers';
import { Listbox, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Controller } from 'react-hook-form';

interface Props {
  className?: string;
}

export default function InvoiceForm({ className }: Props) {
  const methods = useZodForm({
    schema: schema,
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
  } = methods;

  register('status');

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
    <Form
      methods={methods}
      onSubmit={handleSubmit(onSubmit)}
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
              <FormControl className='col-span-6'>
                <TextField
                  type='text'
                  id='senderAddress.street'
                  placeholder='19 Union Terrace'
                  autoComplete='street-address'
                  {...register('senderAddress.street')}
                  aria-invalid={Boolean(errors?.senderAddress?.street)}
                  aria-errormessage='errors-sender-address-street'
                />

                <div className='group flex items-center justify-between text-brand-400 peer-aria-[invalid="true"]:text-accent-200 dark:text-brand-100 dark:peer-aria-[invalid="true"]:text-accent-200'>
                  <FormLabel htmlFor='senderAddress.street'>
                    Street Address
                  </FormLabel>

                  <FormHelperText id='errors-sender-address-street'>
                    {errors?.senderAddress?.street?.message}
                  </FormHelperText>
                </div>
              </FormControl>

              <FormControl className='col-span-3 max-3xs:col-span-6 sm:col-span-2'>
                <TextField
                  type='text'
                  id='senderAddress.city'
                  placeholder='London'
                  autoComplete='address-level2'
                  {...register('senderAddress.city')}
                  aria-invalid={Boolean(errors?.senderAddress?.city)}
                  aria-errormessage='errors-sender-address-city'
                />

                <div className='group flex items-center justify-between text-brand-400 peer-aria-[invalid="true"]:text-accent-200 dark:text-brand-100 dark:peer-aria-[invalid="true"]:text-accent-200'>
                  <FormLabel htmlFor='senderAddress.city'>City</FormLabel>

                  <FormHelperText id='errors-sender-address-city'>
                    {errors?.senderAddress?.city?.message}
                  </FormHelperText>
                </div>
              </FormControl>

              <FormControl className='col-span-3 max-3xs:col-span-6 sm:col-span-2'>
                <TextField
                  type='text'
                  id='senderAddress.postCode'
                  placeholder='E1 3EZ'
                  autoComplete='postal-code'
                  {...register('senderAddress.postCode')}
                  aria-invalid={Boolean(errors?.senderAddress?.postCode)}
                  aria-errormessage='errors-sender-address-postCode'
                />

                <div className='group flex items-center justify-between text-brand-400 peer-aria-[invalid="true"]:text-accent-200 dark:text-brand-100 dark:peer-aria-[invalid="true"]:text-accent-200'>
                  <FormLabel htmlFor='senderAddress.postCode'>
                    Post Code
                  </FormLabel>

                  <FormHelperText id='errors-sender-address-postCode'>
                    {errors?.senderAddress?.postCode?.message}
                  </FormHelperText>
                </div>
              </FormControl>

              <FormControl className='col-span-6 sm:col-span-2'>
                <TextField
                  type='text'
                  id='senderAddress.country'
                  placeholder='United Kingdom'
                  autoComplete='country-name'
                  {...register('senderAddress.country')}
                  aria-invalid={Boolean(errors?.senderAddress?.country)}
                  aria-errormessage='errors-sender-address-country'
                />

                <div className='group flex items-center justify-between text-brand-400 peer-aria-[invalid="true"]:text-accent-200 dark:text-brand-100 dark:peer-aria-[invalid="true"]:text-accent-200'>
                  <FormLabel htmlFor='senderAddress.country'>Country</FormLabel>

                  <FormHelperText id='errors-sender-address-country'>
                    {errors?.senderAddress?.country?.message}
                  </FormHelperText>
                </div>
              </FormControl>
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
              <FormControl className='col-span-6'>
                <TextField
                  type='text'
                  id='clientName'
                  placeholder='Alex Grim'
                  autoComplete='name'
                  {...register('clientName')}
                  aria-invalid={Boolean(errors?.clientName)}
                  aria-errormessage='errors-client-name'
                />

                <div className='group flex items-center justify-between text-brand-400 peer-aria-[invalid="true"]:text-accent-200 dark:text-brand-100 dark:peer-aria-[invalid="true"]:text-accent-200'>
                  <FormLabel htmlFor='clientName'>Client&apos;s Name</FormLabel>

                  <FormHelperText id='errors-client-name'>
                    {errors?.clientName?.message}
                  </FormHelperText>
                </div>
              </FormControl>

              <FormControl className='col-span-6'>
                <TextField
                  type='email'
                  id='clientEmail'
                  placeholder='e.g. alexgrim@mail.com'
                  autoComplete='email'
                  {...register('clientEmail')}
                  aria-invalid={Boolean(errors?.clientEmail)}
                  aria-errormessage='errors-client-email'
                />

                <div className='group flex items-center justify-between text-brand-400 peer-aria-[invalid="true"]:text-accent-200 dark:text-brand-100 dark:peer-aria-[invalid="true"]:text-accent-200'>
                  <FormLabel htmlFor='clientEmail'>
                    Client&apos;s Email
                  </FormLabel>

                  <FormHelperText id='errors-client-email'>
                    {errors?.clientEmail?.message}
                  </FormHelperText>
                </div>
              </FormControl>

              <FormControl className='col-span-6'>
                <TextField
                  type='text'
                  id='clientAddress.street'
                  placeholder='84 Church Way'
                  autoComplete='street-address'
                  {...register('clientAddress.street')}
                  aria-invalid={Boolean(errors?.clientAddress?.street)}
                  aria-errormessage='errors-client-address-street'
                />

                <div className='group flex items-center justify-between text-brand-400 peer-aria-[invalid="true"]:text-accent-200 dark:text-brand-100 dark:peer-aria-[invalid="true"]:text-accent-200'>
                  <FormLabel htmlFor='clientAddress.street'>
                    Street Address
                  </FormLabel>

                  <FormHelperText id='errors-client-address-street'>
                    {errors?.clientAddress?.street?.message}
                  </FormHelperText>
                </div>
              </FormControl>

              <FormControl className='col-span-3 max-3xs:col-span-6 sm:col-span-2'>
                <TextField
                  type='text'
                  id='clientAddress.city'
                  placeholder='Bradford'
                  autoComplete='address-level2'
                  {...register('clientAddress.city')}
                  aria-invalid={Boolean(errors?.clientAddress?.city)}
                  aria-errormessage='errors-client-address-city'
                />

                <div className='group flex items-center justify-between text-brand-400 peer-aria-[invalid="true"]:text-accent-200 dark:text-brand-100 dark:peer-aria-[invalid="true"]:text-accent-200'>
                  <FormLabel htmlFor='clientAddress.city'>City</FormLabel>

                  <FormHelperText id='errors-client-address-city'>
                    {errors?.clientAddress?.city?.message}
                  </FormHelperText>
                </div>
              </FormControl>

              <FormControl className='col-span-3 max-3xs:col-span-6 sm:col-span-2'>
                <TextField
                  type='text'
                  id='clientAddress.postCode'
                  placeholder='BD1 9PB'
                  autoComplete='postal-code'
                  {...register('clientAddress.postCode')}
                  aria-invalid={Boolean(errors?.clientAddress?.postCode)}
                  aria-errormessage='errors-client-address-postCode'
                />

                <div className='group flex items-center justify-between text-brand-400 peer-aria-[invalid="true"]:text-accent-200 dark:text-brand-100 dark:peer-aria-[invalid="true"]:text-accent-200'>
                  <FormLabel htmlFor='clientAddress.postCode'>
                    Post Code
                  </FormLabel>

                  <FormHelperText id='errors-client-address-postCode'>
                    {errors?.clientAddress?.postCode?.message}
                  </FormHelperText>
                </div>
              </FormControl>

              <FormControl className='col-span-6 sm:col-span-2'>
                <TextField
                  type='text'
                  id='clientAddress.country'
                  placeholder='United Kingdom'
                  autoComplete='country-name'
                  {...register('clientAddress.country')}
                  aria-invalid={Boolean(errors?.clientAddress?.country)}
                  aria-errormessage='errors-client-address-country'
                />

                <div className='group flex items-center justify-between text-brand-400 peer-aria-[invalid="true"]:text-accent-200 dark:text-brand-100 dark:peer-aria-[invalid="true"]:text-accent-200'>
                  <FormLabel htmlFor='clientAddress.country'>Country</FormLabel>

                  <FormHelperText id='errors-client-address-country'>
                    {errors?.clientAddress?.country?.message}
                  </FormHelperText>
                </div>
              </FormControl>
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

            <div className='grid grid-cols-6 gap-5'>
              <FormControl className='relative col-span-6 sm:col-span-3'>
                <FormLabel htmlFor='issued'>Invoice Date</FormLabel>
              </FormControl>

              <Controller
                name='paymentTerms'
                control={control}
                render={({ field }) => (
                  <Listbox {...field}>
                    <FormControl className='relative col-span-6 sm:col-span-3'>
                      <Listbox.Label as={FormLabel}>
                        Payment Terms
                      </Listbox.Label>

                      <div className='relative'>
                        <Listbox.Button
                          title='select a payment'
                          as={Button}
                          className='peer '
                        >
                          <span className='block truncate'>
                            Net {pluralize('Day', 10)}
                          </span>

                          <span className='pointer-events-none'>
                            <icons.chevron.down
                              aria-hidden
                              className='transform-gpu ui-open:-rotate-180'
                            />
                          </span>
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
                          <Listbox.Options>
                            {[1, 2, 3].map((term) => (
                              <Listbox.Option
                                key={term.toString()}
                                value={term}
                              >
                                <span className='block truncate'>
                                  Net {term} {pluralize('Day', term)}
                                </span>
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </FormControl>
                  </Listbox>
                )}
              />

              {/* data-invalid={Boolean(errors?.description)} */}
              <FormControl className='col-span-6'>
                <TextField
                  type='text'
                  id='description'
                  placeholder='e.g. Graphic Design Service'
                  {...register('description')}
                  aria-invalid={Boolean(errors?.description)}
                  aria-errormessage='errors-description'
                />

                <div className='group flex items-center justify-between text-brand-400 peer-aria-[invalid="true"]:text-accent-200 dark:text-brand-100 dark:peer-aria-[invalid="true"]:text-accent-200'>
                  <FormLabel htmlFor='description'>
                    Product Description
                  </FormLabel>

                  <FormHelperText id='errors-description'>
                    {errors?.description?.message}
                  </FormHelperText>
                </div>
              </FormControl>
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
              name='draft'
              // onClick={() => void setValue('status', 'draft')}
              variant='secondary'
              className='ms-auto '
            >
              Save as draft
            </Button>

            <Button
              name='pending'
              type='submit'
              // onClick={() => void setValue('status', 'pending')}
              variant='primary'
            >
              Save & Send
            </Button>
          </div>
        </Container>
      </footer>
    </Form>
  );
}
