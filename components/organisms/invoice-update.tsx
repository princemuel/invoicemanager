'use client';

import type { RHFSubmitHandler } from '@/lib';
import {
  DateTime,
  InvoiceFormSchema,
  calculateTotal,
  constants,
  getErrorMessage,
  hasValues,
  terms,
  useApiState,
  useEditInvoiceModal,
  useZodForm,
} from '@/lib';
import { produce } from 'immer';
import * as React from 'react';
import toast from 'react-hot-toast';
import { v4 as uuid } from 'uuid';
import { Text } from '../atoms';
import {
  BaseModal,
  DatePicker,
  FormField,
  TermsDropdown,
  UpdateInvoiceItemList,
} from '../molecules';

interface Props {
  invoice: InvoiceTypeSafe;
}

const UpdateInvoiceForm = ({ invoice }: Props) => {
  const invoiceModal = useEditInvoiceModal();

  const methods = useZodForm({
    schema: InvoiceFormSchema,
    mode: 'all',
    defaultValues: {
      clientAddress: {
        street: invoice?.clientAddress?.street || '',
        city: invoice?.clientAddress?.city || '',
        country: invoice?.clientAddress?.country || '',
        postCode: invoice?.clientAddress?.postCode || '',
      },
      clientEmail: invoice?.clientEmail || '',
      clientName: invoice?.clientName || '',
      description: invoice?.description || '',
      items: hasValues(invoice?.items) ? invoice?.items : [],
      paymentDue: DateTime.parse(invoice?.paymentDue).toISOString(),
      paymentTerms: invoice?.paymentTerms || 1,
      senderAddress: {
        street: invoice?.senderAddress?.street || '',
        city: invoice?.senderAddress?.city || '',
        country: invoice?.senderAddress?.country || '',
        postCode: invoice?.senderAddress?.postCode || '',
      },
      //@ts-expect-error ignore expected error
      status: invoice?.status || 'PENDING',
      total: invoice?.total || 0,
    },
  });

  const { router, isMutating, setIsFetching, startTransition } = useApiState();

  const [status, setStatus] = React.useState(invoice?.status);
  const [selectedTerm, setSelectedTerm] = React.useState(
    invoice?.paymentTerms || terms[0].value
  );
  const [selectedDate, setSelectedDate] = React.useState(
    DateTime.parse(invoice?.issued)
  );

  const onSubmit: RHFSubmitHandler<typeof InvoiceFormSchema> = async (data) => {
    try {
      const draft = produce(data, (draft) => {
        draft.paymentTerms = selectedTerm;

        const duration = constants.ONE_DAY * (Number(selectedTerm) || 1);
        const dueTime = selectedDate.valueOf() + duration;

        draft.paymentDue = new Date(dueTime).toISOString();
        //@ts-expect-error ignore expected error
        draft.status = status;

        for (const item of draft?.items) {
          item.id = uuid();
        }
        draft.total = calculateTotal(draft?.items, 'total');
      });

      const result = InvoiceFormSchema.safeParse(draft);
      if (!result.success) {
        throw new Error(JSON.stringify(result.error));
      }

      setIsFetching(true);

      const response = await fetch(`/api/invoices/${invoice?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(draft),
      });

      if (!response.ok) throw new Error('Invalid Response');

      await response.json();

      setIsFetching(false);

      startTransition(() => {
        router.refresh();
        methods.reset();
        invoiceModal.close();
      });
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const isSubmittable =
    Boolean(methods.formState.isDirty) && Boolean(methods.formState.isValid);

  return (
    <BaseModal
      show={invoiceModal.show}
      onClose={invoiceModal.close}
      onSubmit={onSubmit}
      methods={methods}
      className='max-w-screen-xl'
    >
      <div>
        <header className='mb-10'>
          <Text as='h1' className='text-brand-900 dark:text-neutral-100 '>
            Edit <span className='uppercase'>#{invoice.tag}</span>
          </Text>
        </header>

        {/*<!--------- SENDER DETAILS START ---------!>*/}
        <fieldset className='grid grid-cols-6 gap-6'>
          <Text
            as='legend'
            className='body-100 col-span-6 block font-bold text-brand-500'
          >
            Bill From
          </Text>

          <FormField
            type='text'
            name='senderAddress.street'
            label={'Street Address'}
            defaultValue={invoice?.senderAddress?.street}
            className='col-span-6 mt-10'
            autoComplete='street-address'
          />

          <FormField
            type='text'
            name='senderAddress.city'
            label={'City'}
            defaultValue={invoice?.senderAddress?.city}
            className='col-span-3 max-s:col-span-6 sx:col-span-2'
            autoComplete='address-level2'
          />

          <FormField
            type='text'
            name='senderAddress.postCode'
            label={'Post Code'}
            defaultValue={invoice?.senderAddress?.postCode}
            className='col-span-3 max-s:col-span-6 sx:col-span-2'
            autoComplete='postal-code'
          />

          <FormField
            type='text'
            name='senderAddress.country'
            label={'Country'}
            defaultValue={invoice?.senderAddress?.country}
            className='col-span-6 sx:col-span-2'
            autoComplete='country-name'
          />
        </fieldset>
        {/*<!--------- SENDER DETAILS END ---------!>*/}

        {/*<!--------- CLIENT DETAILS START ---------!>*/}
        <fieldset className='mt-20 grid grid-cols-6 gap-6'>
          <Text
            as='legend'
            className='body-100 col-span-6 block font-bold text-brand-500'
          >
            Bill To
          </Text>

          <FormField
            type='text'
            name='clientName'
            label={"Client's Name"}
            defaultValue={invoice?.clientName}
            className='col-span-6 mt-10'
            autoComplete='name'
          />

          <FormField
            type='email'
            name='clientEmail'
            label={"Client's Email"}
            defaultValue={invoice?.clientEmail}
            className='col-span-6'
            autoComplete='email'
          />

          <FormField
            type='text'
            name='clientAddress.street'
            label={'Street Address'}
            defaultValue={invoice?.clientAddress?.street}
            className='col-span-6'
            autoComplete='street-address'
          />

          <FormField
            type='text'
            name='clientAddress.city'
            label={'City'}
            defaultValue={invoice?.clientAddress?.city}
            className='col-span-3 max-s:col-span-6 sx:col-span-2'
            autoComplete='address-level2'
          />

          <FormField
            type='text'
            name='clientAddress.postCode'
            label={'Post Code'}
            defaultValue={invoice?.clientAddress?.postCode}
            className='col-span-3 max-s:col-span-6 sx:col-span-2'
            autoComplete='postal-code'
          />

          <FormField
            type='text'
            name='clientAddress.country'
            label={'Country'}
            defaultValue={invoice?.clientAddress?.country}
            className='col-span-6 sx:col-span-2'
            autoComplete='country-name'
          />
        </fieldset>
        {/*<!--------- CLIENT DETAILS END ---------!>*/}

        {/*<!--------- PAYMENT DETAILS START ---------!>*/}
        <fieldset className='mt-16 grid grid-cols-6 gap-6'>
          <Text as='legend' className='sr-only'>
            Payment Info
          </Text>

          <div className='relative col-span-6 sm:col-span-3'>
            <DatePicker
              title='Invoice Date'
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              disabled
            />
          </div>

          <div className='relative col-span-6 sm:col-span-3'>
            <label
              htmlFor='paymentTerms'
              className='body-100 block text-brand-400 dark:text-brand-300'
            >
              Payment Terms
            </label>

            <TermsDropdown
              terms={terms}
              selected={selectedTerm}
              setSelected={setSelectedTerm}
            />
          </div>

          <FormField
            type='text'
            name='description'
            label={'Product Description'}
            defaultValue={invoice?.description}
            className='col-span-6'
          />
        </fieldset>
        {/*<!--------- PAYMENT DETAILS END ---------!>*/}

        {/*<!--------- ITEM DETAILS START ---------!>*/}
        <fieldset className='mb-40 mt-16'>
          <legend className='block text-[1.8rem] font-bold leading-[3.2rem] tracking-[-0.32px] text-[#777F98]'>
            Item List
          </legend>

          {/* @ts-expect-error ignore expected error  */}
          <UpdateInvoiceItemList methods={methods} invoice={invoice} />
        </fieldset>
        {/*<!--------- ITEM DETAILS END ---------!>*/}

        <div className='sticky bottom-0 z-10 bg-neutral-200 bg-100 px-[2.4rem] py-10 dark:bg-brand-700'>
          <section className='h-container flex items-center gap-6'>
            <button
              type='button'
              className='btn body-100 bg-neutral-300 px-8 py-6 font-bold text-brand-300 first:ml-auto dark:bg-[#373B53]'
              onClick={invoiceModal.close}
            >
              Cancel
            </button>
            <button
              type='submit'
              className='btn body-100 bg-brand-500 px-8 py-6 font-bold text-neutral-100'
              disabled={!isSubmittable}
              onClick={() => void setStatus('PENDING')}
            >
              Save Changes
            </button>
          </section>
        </div>
      </div>
    </BaseModal>
  );
};

export { UpdateInvoiceForm };
