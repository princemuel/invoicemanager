import {
  DateTime,
  InvoiceFormSchema,
  RHFSubmitHandler,
  calculateTotal,
  constants,
  hasValues,
  terms,
  useZodForm,
} from '@src/helpers';
import {
  useGetInvoiceQuery,
  useGetInvoicesQuery,
  useUpdateInvoiceMutation,
} from '@src/hooks';
import { client } from '@src/lib';
import { useQueryClient } from '@tanstack/react-query';
import produce from 'immer';
import { useReducer, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { Text } from '../atoms';
import { Calendar, Dropdown, EditItemList, FormField } from '../molecules';

interface Props {}

const EditInvoiceForm = (props: Props) => {
  const { invoiceId } = useParams();
  const location = useLocation();

  if (!invoiceId) {
    return <Navigate to='/' state={{ from: location }} replace />;
  }

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data } = useGetInvoiceQuery(client, {
    where: { id: invoiceId! },
  });

  const { mutate: updateInvoice } = useUpdateInvoiceMutation(client, {
    onSuccess: (data, variables, context) => {
      //!NOTE: Test this scenario
      queryClient.invalidateQueries({
        queryKey: useGetInvoicesQuery.getKey(),
      });
      queryClient.invalidateQueries({
        queryKey: useGetInvoiceQuery.getKey({
          where: { id: invoiceId },
        }),
      });
      navigate(-1);
    },
  });

  const invoice = data?.invoice;

  console.table(invoice);

  const [isShowing, setIsShowing] = useReducer((prev) => !prev, false);
  const [status, setStatus] = useState(invoice?.status);
  const [selectedTerm, setSelectedTerm] = useState(
    invoice?.paymentTerms || terms[0].value
  );
  const [selectedDate, setSelectedDate] = useState(
    DateTime.parse(invoice?.issueDate)
  );

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
      //@ts-expect-error
      status: invoice?.status || 'PENDING',
      total: invoice?.total || 0,
    },
  });

  const onSubmit: RHFSubmitHandler<typeof InvoiceFormSchema> = async (data) => {
    if (!invoiceId) throw new ReferenceError('The invoice id is not defined');

    try {
      const draft = produce(data, (draft) => {
        draft.paymentTerms = selectedTerm;

        const duration = constants.ONE_DAY * (Number(selectedTerm) || 1);
        const dueTime = selectedDate.valueOf() + duration;

        draft.paymentDue = new Date(dueTime).toISOString();
        //@ts-expect-error
        draft.status = status;

        for (const item of draft?.items) {
          item.id = uuid();
        }
        draft.total = calculateTotal(draft?.items, 'total');
      });

      const result = InvoiceFormSchema.safeParse(draft);

      // The data is invalid
      if (!result.success) {
        throw new Error(JSON.stringify(result.error));
      }

      // @ts-expect-error
      updateInvoice({ input: draft, where: { id: invoiceId } });
      methods.reset();
    } catch (error) {
      console.error('SUBMIT_ERROR', error);
    }
  };

  const isSubmittable =
    Boolean(methods.formState.isDirty) && Boolean(methods.formState.isValid);

  return (
    <FormProvider {...methods}>
      <form className='mt-10' onSubmit={methods.handleSubmit(onSubmit)}>
        <div className='h-container'>
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
        </div>

        <div className='h-container'>
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
        </div>

        <div className='h-container'>
          {/*<!--------- PAYMENT DETAILS START ---------!>*/}
          <fieldset className='mt-16 grid grid-cols-6 gap-6'>
            <Text as='legend' className='sr-only'>
              Payment Info
            </Text>

            <div className='relative col-span-6 sm:col-span-3'>
              <Calendar
                title='Invoice Date'
                selectedDate={selectedDate}
                shouldOpen={isShowing}
                setSelectedDate={setSelectedDate}
                setShouldOpen={setIsShowing}
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

              <Dropdown
                terms={terms}
                selected={selectedTerm}
                setSelected={setSelectedTerm}
              />
            </div>

            <FormField
              type='text'
              name='description'
              label={'Project Description'}
              defaultValue={invoice?.description}
              className='col-span-6'
            />
          </fieldset>
          {/*<!--------- PAYMENT DETAILS END ---------!>*/}
        </div>
        <div className='h-container'>
          {/*<!--------- ITEM DETAILS START ---------!>*/}
          <fieldset className='mb-40 mt-16'>
            <legend className='block text-[1.8rem] font-bold leading-[3.2rem] tracking-[-0.32px] text-[#777F98]'>
              Item List
            </legend>

            {/* @ts-expect-error */}
            <EditItemList methods={methods} invoice={invoice} />
          </fieldset>
          {/*<!--------- ITEM DETAILS END ---------!>*/}
        </div>

        <div className='sticky bottom-0 bg-neutral-100 bg-100 px-[2.4rem] py-10 dark:bg-brand-700'>
          <section className='h-container flex items-center gap-6'>
            <button
              type='button'
              className='btn body-100 bg-neutral-300 px-8 py-6 font-bold text-brand-300 first:ml-auto dark:bg-[#373B53]'
              onClick={() => void navigate(-1)}
            >
              Cancel
            </button>
            <button
              type='submit'
              className='btn body-100 bg-brand-500 px-8 py-6 font-bold text-neutral-100'
              onClick={() => void setStatus('PENDING')}
            >
              Save Changes
            </button>
          </section>
        </div>
      </form>
    </FormProvider>
  );
};

export { EditInvoiceForm };
