import {
  DateTime,
  InvoiceFormSchema,
  RHFSubmitHandler,
  calculateTotal,
  constants,
  terms,
  useZodForm,
} from '@/lib';
import { produce } from 'immer';
import { useEffect, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { Text } from '../atoms';
import { DatePicker, Dropdown, FormField, NewItemList } from '../molecules';
interface Props {}

const NewInvoiceForm = (props: Props) => {
  const [status, setStatus] = useState<InvoiceStatus>('PENDING');
  const [selectedTerm, setSelectedTerm] = useState(terms[0].value);
  const [selectedDate, setSelectedDate] = useState(DateTime.TODAY);

  const methods = useZodForm({
    schema: InvoiceFormSchema,
    mode: 'onChange',
  });

  useEffect(() => {
    const subscription = methods.watch((value, { name, type }) => {
      console.log('VALUE', value, 'NAME', name, 'TYPE', type);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [methods]);

  const onSubmit: RHFSubmitHandler<typeof InvoiceFormSchema> = async (data) => {
    try {
      const draft = produce(data, (draft) => {
        draft.paymentTerms = selectedTerm;
        draft.issueDate = selectedDate.toISOString();

        const duration = constants.ONE_DAY * (Number(selectedTerm) || 1);
        const dueTime = selectedDate.valueOf() + duration;

        draft.paymentDue = new Date(dueTime).toISOString();
        draft.status = status;
        draft.total = calculateTotal(draft?.items, 'total');

        draft.tag = '';
        draft.userId = user?.id as string;
      });

      const result = InvoiceFormSchema.safeParse(draft);

      // The data is invalid
      if (!result.success) {
        throw new Error(JSON.stringify(result.error));
      }

      console.table(draft);
      //@ts-expect-error ignore expected error
      createInvoice({ input: draft });
      methods.reset();
    } catch (error) {
      console.error('SUBMIT_ERROR', error);
    }
  };

  const isSubmittable =
    Boolean(methods.formState.isDirty) && Boolean(methods.formState.isValid);

  return (
    <FormProvider {...methods}>
      <form
        className='relative mt-10'
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className='h-container'>
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
        </div>

        <div className='h-container'>
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
        </div>

        <div className='h-container'>
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

              <Dropdown
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
        </div>

        <div className='h-container'>
          {/*<!--------- ITEM DETAILS START ---------!>*/}
          <fieldset className='mb-40 mt-16'>
            <legend className='block text-[1.8rem] font-bold leading-[3.2rem] tracking-[-0.32px] text-[#777F98]'>
              Item List
            </legend>

            <NewItemList methods={methods} />
          </fieldset>
          {/*<!--------- ITEM DETAILS END ---------!>*/}
        </div>

        <div className='sticky bottom-0 bg-neutral-200 bg-100 px-[2.4rem] py-10 dark:bg-brand-700'>
          <section className='h-container flex items-center gap-4'>
            <button
              type='button'
              className='btn body-100 bg-neutral-300 px-6 py-6 font-bold text-brand-400 first:mr-auto'
              onClick={() => void navigate(-1)}
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
      </form>
    </FormProvider>
  );
};

export { NewInvoiceForm };
