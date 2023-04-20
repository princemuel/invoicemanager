import type { InvoiceStatus } from '@src/@types';
import { useAuthState } from '@src/context';
import {
  DateTime,
  InvoiceFormSchema,
  RHFSubmitHandler,
  calculateTotal,
  constants,
  formatPrice,
  terms,
  useZodForm,
} from '@src/helpers';
import { useCreateInvoiceMutation } from '@src/hooks';
import { client } from '@src/lib';
import clsx from 'clsx';
import produce from 'immer';
import { useEffect, useState } from 'react';
import { FormProvider, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { FormErrorText, Text } from '../atoms';
import { Calendar, Dropdown, FormField } from '../molecules';

interface Props {}

const NewInvoiceForm = (props: Props) => {
  const [status, setStatus] = useState<InvoiceStatus>('PENDING');
  const [selectedTerm, setSelectedTerm] = useState(terms[0].value);
  const [selectedDate, setSelectedDate] = useState(DateTime.TODAY);
  const [isShowing, setIsShowing] = useState(false);

  const methods = useZodForm({
    schema: InvoiceFormSchema,
    mode: 'onTouched',
  });
  const { fields, append, remove } = useFieldArray({
    name: 'items',
    control: methods.control,
    rules: {
      required: 'Please add at least one item',
    },
  });

  useEffect(() => {
    const subscription = methods.watch((value, { name, type }) =>
      console.log(value, name, type)
    );
    return () => subscription.unsubscribe();
  }, [methods.watch]);

  const { user } = useAuthState();
  const navigate = useNavigate();
  const { mutate: createInvoice } = useCreateInvoiceMutation(client, {});

  const onSubmit: RHFSubmitHandler<typeof InvoiceFormSchema> = async (data) => {
    try {
      const draft = produce(data, (draft) => {
        draft.paymentTerms = selectedTerm;
        draft.updatedAt = selectedDate.toISOString();

        const duration = constants.ONE_DAY * (Number(selectedTerm) || 1);
        const dueTime = selectedDate.valueOf() + duration;

        draft.paymentDue = new Date(dueTime).toISOString();
        draft.status = status;

        for (const item of draft?.items) {
          item.total = calculateTotal(item?.quantity || 0, item?.price || 0);
        }
        draft.total = calculateTotal(draft?.items || 0);

        draft.tag = '';
        draft.userId = user?.id as string;
      });

      const result = InvoiceFormSchema.safeParse(draft);

      // The data is invalid
      if (!result.success) {
        throw new Error(JSON.stringify(result.error));
      }

      console.table(draft);
      //@ts-expect-error
      // createInvoice({ input: draft });
      // methods.reset();
    } catch (error) {
      console.error('SUBMIT_ERROR', error);
    }
  };

  const isSubmittable =
    Boolean(methods.formState.isDirty) && Boolean(methods.formState.isValid);
  // formstate has the errors
  console.log(methods.formState.errors);

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
              <Calendar
                title='Issue Date'
                selectedDate={selectedDate}
                shouldOpen={isShowing}
                setSelectedDate={setSelectedDate}
                setShouldOpen={setIsShowing}
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

            <ul className='mt-6 grid grid-cols-8 gap-x-6 gap-y-10 sx:grid-cols-12'>
              <li className='body-100 col-span-8 text-brand-400 dark:text-brand-100 sx:col-span-5'>
                Item Name
              </li>
              <li className='body-100 col-span-2 text-brand-400 dark:text-brand-100'>
                Qty.
              </li>
              <li className='body-100 col-span-3 text-brand-400 dark:text-brand-100 sx:col-span-2'>
                Price
              </li>
              <li className='body-100 col-span-2 text-brand-400 dark:text-brand-100'>
                Total
              </li>
            </ul>

            <ul className='mt-6 flex flex-col gap-8'>
              {fields.map((field, index) => {
                const errors = methods.formState.errors?.items?.[index];
                console.log(errors?.name);
                return (
                  <li
                    key={field.id}
                    className='grid grid-cols-8 items-end gap-x-6 gap-y-10 sx:grid-cols-12'
                  >
                    <label className='col-span-8 flex flex-col-reverse gap-2 sx:col-span-5'>
                      <input
                        type='text'
                        {...methods.register(`items.${index}.name`)}
                        id={`items.${index}.name`}
                        className='body-100 peer w-full rounded-lg border border-brand-100 bg-neutral-100 px-8 py-6 font-bold text-brand-900 caret-brand-500 outline-none autofill:bg-neutral-100 focus:border-brand-500 aria-[invalid="true"]:!border-accent-200 aria-[invalid="true"]:!text-accent-200 focus:aria-[invalid="true"]:!border-accent-200 focus:aria-[invalid="true"]:!ring-accent-200 hover:border-brand-500 dark:border-brand-600 dark:bg-brand-700 dark:text-neutral-100 dark:autofill:bg-brand-700 dark:focus:border-brand-500 dark:hover:border-brand-500'
                        aria-invalid={errors?.name ? 'true' : 'false'}
                        aria-errormessage={`errors-items.${index}.name`}
                        placeholder='Banner Design'
                      />

                      <FormErrorText
                        id={`items.${index}.name`}
                        className='text-right peer-aria-[invalid="true"]:!text-accent-200'
                      >
                        {`${errors?.name?.message || ''}`}
                      </FormErrorText>
                    </label>

                    <label className='col-span-2'>
                      <input
                        type='number'
                        {...methods.register(`items.${index}.quantity`, {
                          valueAsNumber: true,
                        })}
                        id={`items.${index}.quantity`}
                        className={clsx(
                          'body-100 peer w-full rounded-lg border border-brand-100 bg-neutral-100 px-8 py-6 font-bold text-brand-900 caret-brand-500 outline-none autofill:bg-neutral-100 focus:border-brand-500 aria-[invalid="true"]:!border-accent-200 aria-[invalid="true"]:!text-accent-200 focus:aria-[invalid="true"]:!border-accent-200 focus:aria-[invalid="true"]:!ring-accent-200 hover:border-brand-500 dark:border-brand-600 dark:bg-brand-700 dark:text-neutral-100 dark:autofill:bg-brand-700 dark:focus:border-brand-500 dark:hover:border-brand-500'
                        )}
                        aria-invalid={errors?.quantity ? 'true' : 'false'}
                        step={1}
                        placeholder='1'
                      />
                    </label>

                    <label className='col-span-3 sx:col-span-2'>
                      <input
                        type='number'
                        {...methods.register(`items.${index}.price`, {
                          valueAsNumber: true,
                        })}
                        id={`items.${index}.price`}
                        className='body-100 peer w-full rounded-lg border border-brand-100 bg-neutral-100 px-8 py-6 font-bold text-brand-900 caret-brand-500 outline-none autofill:bg-neutral-100 focus:border-brand-500 aria-[invalid="true"]:!border-accent-200 aria-[invalid="true"]:!text-accent-200 focus:aria-[invalid="true"]:!border-accent-200 focus:aria-[invalid="true"]:!ring-accent-200 hover:border-brand-500 dark:border-brand-600 dark:bg-brand-700 dark:text-neutral-100 dark:autofill:bg-brand-700 dark:focus:border-brand-500 dark:hover:border-brand-500'
                        aria-invalid={errors?.price ? 'true' : 'false'}
                        placeholder='200.00'
                        step={0.01}
                      />
                    </label>

                    <div className='col-span-2 self-center'>
                      <output
                        htmlFor={`items.${index}.price items.${index}.quantity`}
                        id={`items.${index}.total`}
                        className='body-100 block font-bold text-[#888EB0]'
                      >
                        {formatPrice(
                          calculateTotal(
                            field?.quantity || 0,
                            field?.price || 0
                          )
                        )}
                      </output>
                    </div>

                    <div className='col-span-1 self-center'>
                      <button
                        type='button'
                        className='inline-block h-[1.6rem] w-[1.3rem] bg-[url(/assets/svgs/icon-delete.svg)] bg-cover bg-no-repeat focus:bg-[url(/assets/svgs/icon-delete-red.svg)] hover:bg-[url(/assets/svgs/icon-delete-red.svg)]'
                        onClick={() => remove(index)}
                      >
                        <span className='sr-only'>Delete Item</span>
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className='mt-16'>
              <button
                type='button'
                className='btn btn-add'
                onClick={() =>
                  append({
                    id: uuid(),
                    name: '',
                    quantity: 0,
                    price: 0,
                    total: 0,
                  })
                }
              >
                &#43; Add New Item
              </button>
            </div>
          </fieldset>
          {/*<!--------- ITEM DETAILS END ---------!>*/}
        </div>

        <div className='sticky bottom-0 bg-neutral-100 bg-100 px-[2.4rem] py-10 dark:bg-brand-700'>
          <section className='h-container flex items-center gap-6'>
            <button
              type='button'
              className='btn body-100 bg-neutral-300 px-8 py-6 font-bold text-brand-400 first:mr-auto'
              onClick={() => navigate(-1)}
            >
              Discard
            </button>
            <button
              type='submit'
              className='btn body-100 bg-[#373B53] px-8 py-6 font-bold text-brand-300 hover:bg-brand-900'
              onClick={() => setStatus('DRAFT')}
            >
              Save as draft
            </button>
            <button
              type='submit'
              // disabled={!isSubmittable}
              className='btn body-100 bg-brand-500 px-8 py-6 font-bold text-neutral-100 hover:bg-brand-200'
              onClick={() => setStatus('PENDING')}
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
