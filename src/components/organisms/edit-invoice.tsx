import { DevTool } from '@hookform/devtools';
import type { InvoiceStatus } from '@src/@types';
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
import { useInvoiceDetail, useUpdateInvoiceMutation } from '@src/hooks';
import { client } from '@src/lib';
import dayjs from 'dayjs';
import produce from 'immer';
import { useEffect, useState } from 'react';
import { FormProvider, useFieldArray } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { FormErrorText, Text } from '../atoms';
import { Calendar, Dropdown, FormInput } from '../molecules';

interface Props {}

const EditInvoiceForm = (props: Props) => {
  const { invoiceId } = useParams();
  const { data: invoice } = useInvoiceDetail(invoiceId!);

  const [status, setStatus] = useState<InvoiceStatus>(
    invoice?.status || 'PENDING'
  );
  const [selectedTerm, setSelectedTerm] = useState(invoice?.paymentTerms || 1);
  const [selectedDate, setSelectedDate] = useState(
    //!NOTE: change this to invoice?.updatedAt later
    DateTime.parse(invoice?.createdAt || dayjs())
  );
  const [isShowing, setIsShowing] = useState(false);

  const methods = useZodForm({
    schema: InvoiceFormSchema,
    mode: 'onChange',
  });

  const { fields, append, remove, prepend, update } = useFieldArray({
    name: 'items',
    control: methods.control,
    rules: {
      required: 'Please add at least one item',
    },
  });

  useEffect(() => {
    invoice?.items?.forEach((field: { [key: string]: any }, idx) => {
      Object.keys(field).forEach((key) => {
        update(idx, field[key]);
      });
    });
  }, [invoice?.items, update]);

  const { mutate: updateInvoice } = useUpdateInvoiceMutation(client, {});

  const onSubmit: RHFSubmitHandler<typeof InvoiceFormSchema> = async (data) => {
    const result = InvoiceFormSchema.safeParse(data);

    const draft = produce(data, (draft) => {
      const duration = constants.ONE_DAY * (Number(draft.paymentTerms) || 1);
      const dueTime = selectedDate.unix() + duration;

      draft.status = status;
      draft.paymentTerms = selectedTerm;
      draft.updatedAt = selectedDate.toISOString();
      draft.paymentDue = new Date(dueTime).toISOString();

      for (const item of draft?.items) {
        item.total = calculateTotal(item?.quantity, item?.price);
      }

      draft.total = calculateTotal(draft?.items);
    });

    console.table(draft);

    if (result.success) {
      // updateInvoice({ input: draft });
      methods.reset();
    } else {
      // The data is invalid
      console.error(result.error);
    }
  };

  const isSubmittable =
    !!methods.formState.isDirty && !!methods.formState.isValid;
  console.log(invoice);

  return (
    <FormProvider {...methods}>
      <form className='my-10' onSubmit={methods.handleSubmit(onSubmit)}>
        {/*<!--------- SENDER DETAILS START ---------!>*/}
        <fieldset className='grid grid-cols-6 gap-6'>
          <Text
            as='legend'
            className='body-100 col-span-6 block font-bold text-brand-500'
          >
            Bill From
          </Text>

          <FormInput
            type='text'
            name='senderAddress.street'
            label={'Street Address'}
            defaultValue={invoice?.senderAddress?.street}
            className='col-span-6 mt-10'
            autoComplete='street-address'
          />

          <FormInput
            type='text'
            name='senderAddress.city'
            label={'City'}
            defaultValue={invoice?.senderAddress?.city}
            className='col-span-3 max-s:col-span-6 sx:col-span-2'
            autoComplete='address-level2'
          />

          <FormInput
            type='text'
            name='senderAddress.postCode'
            label={'Post Code'}
            defaultValue={invoice?.senderAddress?.postCode}
            className='col-span-3 max-s:col-span-6 sx:col-span-2'
            autoComplete='postal-code'
          />

          <FormInput
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

          <FormInput
            type='text'
            name='clientName'
            label={"Client's Name"}
            defaultValue={invoice?.clientName}
            className='col-span-6 mt-10'
            autoComplete='name'
          />

          <FormInput
            type='email'
            name='email'
            label={"Client's Email"}
            defaultValue={invoice?.clientEmail}
            className='col-span-6'
            autoComplete='email'
          />

          <FormInput
            type='text'
            name='clientAddress.street'
            label={'Street Address'}
            defaultValue={invoice?.clientAddress?.street}
            className='col-span-6'
            autoComplete='street-address'
          />

          <FormInput
            type='text'
            name='clientAddress.city'
            label={'City'}
            defaultValue={invoice?.clientAddress?.city}
            className='col-span-3 max-s:col-span-6 sx:col-span-2'
            autoComplete='address-level2'
          />

          <FormInput
            type='text'
            name='clientAddress.postCode'
            label={'Post Code'}
            defaultValue={invoice?.clientAddress?.postCode}
            className='col-span-3 max-s:col-span-6 sx:col-span-2'
            autoComplete='postal-code'
          />

          <FormInput
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

          <FormInput
            type='text'
            name='description'
            label={'Project Description'}
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
                      defaultValue={invoice?.items?.[index]?.name || ''}
                    />

                    <FormErrorText
                      id={`items.${index}.name`}
                      className='text-right peer-aria-[invalid="true"]:!text-accent-200'
                    >
                      {errors?.name?.message || ''}
                    </FormErrorText>
                  </label>

                  <label className='col-span-2'>
                    <input
                      type='number'
                      {...methods.register(`items.${index}.quantity`, {
                        valueAsNumber: true,
                      })}
                      id={`items.${index}.quantity`}
                      className='body-100 peer w-full rounded-lg border border-brand-100 bg-neutral-100 px-8 py-6 font-bold text-brand-900 caret-brand-500 outline-none autofill:bg-neutral-100 focus:border-brand-500 aria-[invalid="true"]:!border-accent-200 aria-[invalid="true"]:!text-accent-200 focus:aria-[invalid="true"]:!border-accent-200 focus:aria-[invalid="true"]:!ring-accent-200 hover:border-brand-500 dark:border-brand-600 dark:bg-brand-700 dark:text-neutral-100 dark:autofill:bg-brand-700 dark:focus:border-brand-500 dark:hover:border-brand-500'
                      placeholder='1'
                      aria-invalid={errors?.quantity ? 'true' : 'false'}
                      defaultValue={invoice?.items?.[index]?.quantity || 0}
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
                      defaultValue={invoice?.items?.[index]?.price || 0}
                    />
                  </label>

                  <div className='col-span-2 self-center'>
                    <output
                      htmlFor={`items.${index}.price items.${index}.quantity`}
                      id={`items.${index}.total`}
                      className='body-100 block font-bold text-[#888EB0]'
                    >
                      {formatPrice(calculateTotal(field.quantity, field.price))}
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
      </form>

      <DevTool control={methods.control} />
    </FormProvider>
  );
};

export { EditInvoiceForm };
