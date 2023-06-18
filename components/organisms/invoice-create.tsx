'use client';

import type { RHFSubmitHandler } from '@/lib';
import {
  DateTime,
  InvoiceFormSchema,
  calculateTotal,
  constants,
  getErrorMessage,
  terms,
  useCreateInvoiceModal,
  useZodForm,
} from '@/lib';
import { produce } from 'immer';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';
import { toast } from 'react-hot-toast';
import { Text } from '../atoms';
import {
  BaseModal,
  DatePicker,
  FormField,
  NewItemList,
  TermsDropdown,
} from '../molecules';

interface Props {
  userId: string;
}

const CreateInvoiceForm = ({ userId }: Props) => {
  const invoiceModal = useCreateInvoiceModal();

  const methods = useZodForm({
    schema: InvoiceFormSchema,
    mode: 'onChange',
  });

  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = React.useTransition();
  const [isFetching, setIsFetching] = React.useState(false);

  const isMutating = isFetching || isPending;

  const [status, setStatus] = React.useState<InvoiceStatus>('PENDING');
  const [selectedTerm, setSelectedTerm] = React.useState(terms[0].value);
  const [selectedDate, setSelectedDate] = React.useState(DateTime.TODAY);

  const onSubmit: RHFSubmitHandler<typeof InvoiceFormSchema> = async (data) => {
    try {
      const draft = produce(data, (draft) => {
        draft.paymentTerms = selectedTerm;
        draft.issued = selectedDate.toISOString();

        const duration = constants.ONE_DAY * (Number(selectedTerm) || 1);
        const dueTime = selectedDate.valueOf() + duration;

        draft.paymentDue = new Date(dueTime).toISOString();
        draft.status = status;
        draft.total = calculateTotal(draft?.items, 'total');

        draft.tag = '';
        draft.userId = userId;
      });

      const result = InvoiceFormSchema.safeParse(draft);
      if (!result.success) {
        throw new Error(JSON.stringify(result.error));
      }

      // console.table(draft);

      setIsFetching(true);

      const response = await fetch('/api/invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(draft),
      });

      if (!response.ok) throw new Error('Invalid Response');

      await response.json();

      setIsFetching(false);

      startTransition(() => {
        if (pathname === '/new') {
          router.push('/invoices');
        } else {
          router.refresh();
        }
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
          <Text as='h1' className='text-brand-900 dark:text-neutral-100'>
            New Invoice
          </Text>
        </header>

        {/*<!--------- SENDER DETAILS START ---------!>*/}
        <fieldset className='grid grid-cols-6 gap-12'>
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
            placeholder='19 Union Terrace'
            className='col-span-6 mt-10'
            autoComplete='street-address'
          />

          <FormField
            type='text'
            name='senderAddress.city'
            label={'City'}
            placeholder='London'
            className='col-span-3 max-s:col-span-6 sx:col-span-2'
            autoComplete='address-level2'
          />

          <FormField
            type='text'
            name='senderAddress.postCode'
            label={'Post Code'}
            placeholder='E1 3EZ'
            className='col-span-3 max-s:col-span-6 sx:col-span-2'
            autoComplete='postal-code'
          />

          <FormField
            type='text'
            name='senderAddress.country'
            label={'Country'}
            placeholder='United Kingdom'
            className='col-span-6 sx:col-span-2'
            autoComplete='country-name'
          />
        </fieldset>
        {/*<!--------- SENDER DETAILS END ---------!>*/}

        {/*<!--------- CLIENT DETAILS START ---------!>*/}
        <fieldset className='mt-20 grid grid-cols-6 gap-12'>
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
            placeholder='Alex Grim'
            className='col-span-6 mt-10'
            autoComplete='name'
          />

          <FormField
            type='email'
            name='clientEmail'
            label={"Client's Email"}
            placeholder='e.g. alexgrim@mail.com'
            className='col-span-6'
            autoComplete='email'
          />

          <FormField
            type='text'
            name='clientAddress.street'
            label={'Street Address'}
            placeholder='84 Church Way'
            className='col-span-6'
            autoComplete='street-address'
          />

          <FormField
            type='text'
            name='clientAddress.city'
            label={'City'}
            placeholder='Bradford'
            className='col-span-3 max-s:col-span-6 sx:col-span-2'
            autoComplete='address-level2'
          />

          <FormField
            type='text'
            name='clientAddress.postCode'
            label={'Post Code'}
            placeholder='BD1 9PB'
            className='col-span-3 max-s:col-span-6 sx:col-span-2'
            autoComplete='postal-code'
          />

          <FormField
            type='text'
            name='clientAddress.country'
            label={'Country'}
            placeholder='United Kingdom'
            className='col-span-6 sx:col-span-2'
            autoComplete='country-name'
          />
        </fieldset>
        {/*<!--------- CLIENT DETAILS END ---------!>*/}

        {/*<!--------- PAYMENT DETAILS START ---------!>*/}
        <fieldset className='mt-16 grid grid-cols-6 gap-12'>
          <Text as='legend' className='sr-only'>
            Payment Info
          </Text>

          <div className='relative col-span-6 sm:col-span-3'>
            <DatePicker
              title='Issue Date'
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
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
            placeholder='e.g. Graphic Design Service'
            className='col-span-6'
          />
        </fieldset>
        {/*<!--------- PAYMENT DETAILS END ---------!>*/}

        {/*<!--------- ITEM DETAILS START ---------!>*/}
        <fieldset className='mb-40 mt-16'>
          <legend className='block text-[1.8rem] font-bold leading-[3.2rem] tracking-[-0.32px] text-[#777F98]'>
            Item List
          </legend>

          <NewItemList methods={methods} />
        </fieldset>

        <div className='sticky bottom-0 bg-neutral-200 bg-100 px-[2.4rem] py-10 dark:bg-brand-700'>
          <section className='h-container flex items-center gap-4'>
            <button
              type='button'
              className='btn body-100 bg-neutral-300 px-6 py-6 font-bold text-brand-400 first:mr-auto'
              onClick={invoiceModal.close}
            >
              Discard
            </button>
            <button
              type='submit'
              className='btn body-100 bg-[#373B53] px-6 py-6 font-bold text-brand-300 hover:bg-brand-900'
              disabled={!isSubmittable}
              onClick={() => void setStatus('DRAFT')}
            >
              Save as draft
            </button>
            <button
              type='submit'
              disabled={!isSubmittable}
              className='btn body-100 bg-brand-500 px-6 py-6 font-bold text-neutral-100 hover:bg-brand-200'
              onClick={() => void setStatus('PENDING')}
            >
              Save & Send
            </button>
          </section>
        </div>
      </div>
    </BaseModal>
  );
};

export { CreateInvoiceForm };
