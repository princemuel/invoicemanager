import { icons } from '@src/common';
import {
  Calendar,
  formatPrice,
  getMonth,
  hasValues,
  totalPrice,
} from '@src/helpers';
import { useZodForm } from '@src/hooks';
import * as React from 'react';
import { FormProvider, SubmitHandler, useFieldArray } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import { Text } from '../atoms';
import { FormInput } from '../molecules';

type Props = {};

const dummyArray = Array(31)
  .fill(1)
  .map((_, i) => String(i + 1));

const GenericStringContraint = z
  .string()
  .min(1, { message: "Can't be empty" })
  .min(2, { message: 'Must more than 2 characters' })
  .toLowerCase()
  .trim();

const AddressSchema = z.object({
  street: GenericStringContraint,
  city: GenericStringContraint,
  country: GenericStringContraint,
  postCode: GenericStringContraint,
});

const GenericEmailContraint = z
  .string()
  .email({ message: 'Invalid email address' })
  .min(1, { message: "Can't be empty" })
  .min(6, { message: 'Must more than 6 characters' })
  .toLowerCase()
  .trim();

const GenericItem = z.object({
  id: z.string(),
  name: z.string(),
  quantity: z.number().int(),
  price: z.number(),
  total: z.number(),
});

const FormSchema = z.object({
  senderAddress: AddressSchema,
  clientName: z.string(),
  clientEmail: GenericEmailContraint,
  clientAddress: AddressSchema,

  createdAt: z.string(),
  paymentTerms: z.number().int(),
  description: z.string(),
  items: z.array(GenericItem),
  total: z.number(),

  paymentDue: z.string(),
  status: z.enum(['DRAFT', 'PENDING', 'PAID']),
});

type FormData = z.infer<typeof FormSchema>;

const CreateInvoiceForm = (props: Props) => {
  const today = Calendar.formatDate(new Date().toISOString());

  const methods = useZodForm({
    schema: FormSchema,
    mode: 'onChange',
  });
  const { fields, append, remove } = useFieldArray({
    name: 'items',
    control: methods.control,
    rules: {
      required: 'Please add at least one item',
    },
  });

  React.useEffect(() => {
    const subscription = methods.watch((value, { name, type }) =>
      console.log(value, name, type)
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [methods.watch]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const result = FormSchema.safeParse(data);

    if (result.success) {
      // login({ input: data });
      console.log(data);
      methods.reset();
    } else {
      // The data is invalid
      console.error(result.error);
    }
  };

  const isSubmittable =
    !!methods.formState.isDirty && !!methods.formState.isValid;

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
            placeholder='19 Union Terrace'
            className='col-span-6 mt-10'
            autoComplete='street-address'
          />

          <FormInput
            type='text'
            name='senderAddress.city'
            label={'City'}
            placeholder='London'
            className='col-span-3 max-s:col-span-6 sx:col-span-2'
            autoComplete='address-level2'
          />

          <FormInput
            type='text'
            name='senderAddress.postCode'
            label={'Post Code'}
            placeholder='E1 3EZ'
            className='col-span-3 max-s:col-span-6 sx:col-span-2'
            autoComplete='postal-code'
          />

          <FormInput
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
            placeholder='Alex Grim'
            className='col-span-6 mt-10'
            autoComplete='name'
          />

          <FormInput
            type='email'
            name='email'
            label={"Client's Email"}
            placeholder='e.g. alexgrim@mail.com'
            className='col-span-6'
            autoComplete='email'
          />

          <FormInput
            type='text'
            name='clientAddress.street'
            label={'Street Address'}
            placeholder='84 Church Way'
            className='col-span-6'
            autoComplete='street-address'
          />

          <FormInput
            type='text'
            name='clientAddress.city'
            label={'City'}
            placeholder='Bradford'
            className='col-span-3 max-s:col-span-6 sx:col-span-2'
            autoComplete='address-level2'
          />

          <FormInput
            type='text'
            name='clientAddress.postCode'
            label={'Post Code'}
            placeholder='BD1 9PB'
            className='col-span-3 max-s:col-span-6 sx:col-span-2'
            autoComplete='postal-code'
          />

          <FormInput
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
        <fieldset className='mt-16 grid grid-cols-6 gap-6'>
          <Text as='legend' className='sr-only'>
            Payment Info
          </Text>

          <div className='relative col-span-6 sm:col-span-3'>
            <label
              htmlFor='createdAt'
              className='body-100 block text-brand-400 dark:text-brand-300'
            >
              Invoice Date
            </label>
            <input
              type='text'
              id='createdAt'
              name='createdAt'
              className='body-100 peer mt-6 w-full cursor-pointer rounded-lg border border-brand-100 bg-neutral-100 bg-[url(/assets/svgs/icon-calendar.svg)] bg-[center_right_1.6rem] bg-no-repeat px-8 py-6 font-bold text-brand-900 outline-none focus:border-brand-500 hover:border-brand-500 dark:border-brand-600 dark:bg-brand-700 dark:text-neutral-100 dark:focus:border-brand-500 dark:hover:border-brand-500'
              placeholder={today}
              aria-controls=''
            />

            {/* absolute bottom-0 left-0 z-10 w-full translate-y-full */}
            <div className='absolute z-10 mt-8 w-full scale-y-0 rounded-brand bg-neutral-100 pb-8 pt-12 shadow-200 transition-all duration-500 peer-focus:scale-100 dark:bg-brand-700 dark:shadow-300'>
              <div className='flex items-center justify-between px-12'>
                <button type='button' className='grid place-content-center'>
                  <img src={icons.arrow.left} alt={''} />
                  <span className='sr-only'>Previous Month</span>
                </button>

                <p className='body-100 font-bold text-brand-900 dark:text-neutral-100'>
                  <time>{getMonth(today)}</time>
                  <span className='sr-only'>Month</span>
                  <span className='sr-only'>Year</span>
                </p>

                <button type='button' className='grid place-content-center'>
                  <img src={icons.arrow.right} alt={''} />
                  <span className='sr-only'>Next Month</span>
                </button>
              </div>

              <ul className='grid grid-cols-7 items-center justify-items-center gap-8 px-10 py-8'>
                {hasValues(dummyArray) &&
                  dummyArray.map((el) => {
                    return (
                      <li
                        key={el}
                        className='body-100 cursor-pointer font-bold text-brand-900 focus:text-brand-500 hover:text-brand-500 dark:text-neutral-100 dark:focus:text-brand-500 dark:hover:text-brand-500'
                      >
                        {el}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>

          <div className='relative col-span-6 sm:col-span-3'>
            <label
              htmlFor='paymentTerms'
              className='body-100 block text-brand-400 dark:text-brand-300'
            >
              Payment Terms
            </label>
            <input
              type='text'
              id='paymentTerms'
              name='paymentTerms'
              className='body-100 peer mt-6 w-full cursor-pointer rounded-lg border border-brand-100 bg-neutral-100 bg-[url(/assets/svgs/icon-arrow-down.svg)] bg-[center_right_1.6rem] bg-no-repeat px-8 py-6 font-bold text-brand-900 outline-none focus:border-brand-500 hover:border-brand-500 dark:border-brand-600 dark:bg-brand-700 dark:text-neutral-100 dark:focus:border-brand-500 dark:hover:border-brand-500'
              placeholder='Net 30 Days'
            />

            <ul className='absolute z-10 mt-8 w-full scale-y-0 rounded-brand bg-neutral-100 py-6 shadow-200 transition-all duration-500 peer-focus:scale-100 dark:bg-brand-700 dark:shadow-300'>
              <li className='body-100 cursor-pointer border-b border-brand-100 p-7 font-bold text-brand-900 focus:text-brand-500 hover:text-brand-500 dark:border-brand-600 dark:text-brand-100'>
                Net 1 Day
              </li>
              <li className='body-100 cursor-pointer border-b border-brand-100 p-7 font-bold text-brand-900 focus:text-brand-500 hover:text-brand-500 dark:border-brand-600 dark:text-brand-100'>
                Net 7 Days
              </li>
              <li className='body-100 cursor-pointer border-b border-brand-100 p-7 font-bold text-brand-900 focus:text-brand-500 hover:text-brand-500 dark:border-brand-600 dark:text-brand-100'>
                Net 14 Days
              </li>
              <li className='body-100 cursor-pointer p-7 font-bold text-brand-900 focus:text-brand-500 hover:text-brand-500 dark:text-brand-100'>
                Net 30 Days
              </li>
            </ul>
          </div>

          <div className='col-span-6'>
            <label
              htmlFor='description'
              className='body-100 block text-brand-400 dark:text-brand-300'
            >
              Project Description
            </label>
            <input
              type='text'
              id='description'
              name='description'
              className='body-100 mt-6 w-full rounded-lg border border-brand-100 bg-neutral-100 px-8 py-6 font-bold text-brand-900 outline-none focus:border-brand-500 hover:border-brand-500 dark:border-brand-600 dark:bg-brand-700 dark:text-neutral-100 dark:focus:border-brand-500 dark:hover:border-brand-500'
              placeholder='e.g. Graphic Design Service'
            />
          </div>
        </fieldset>
        {/*<!--------- PAYMENT DETAILS END ---------!>*/}

        {/*<!--------- ITEM DETAILS START ---------!>*/}
        <fieldset className='mb-40 mt-16'>
          <legend className='block text-[1.8rem] font-bold leading-[3.2rem] tracking-[-0.32px] text-[#777F98]'>
            Item List
          </legend>

          <ul className='flex flex-col gap-12'>
            {fields.map((field, index) => {
              // const errors =
              //   methods.formState.errors?.items?.
              const error = methods.formState.errors?.items?.[index];

              return (
                <li
                  key={field.id}
                  className='grid grid-cols-8 gap-x-6 gap-y-10 first:mt-10 sx:grid-cols-12'
                >
                  <div className='col-span-8 sx:col-span-5'>
                    <label
                      htmlFor={`items.${index}.name`}
                      className='body-100 block text-brand-400 dark:text-brand-300'
                    >
                      Item Name
                    </label>
                    <input
                      type='text'
                      {...methods.register(`items.${index}.name`)}
                      id={`items.${index}.name`}
                      className='body-100 mt-6 w-full rounded-lg border border-brand-100 bg-neutral-100 px-8 py-6 font-bold text-brand-900 outline-none focus:border-brand-500 hover:border-brand-500 dark:border-brand-600 dark:bg-brand-700 dark:text-neutral-100 dark:focus:border-brand-500 dark:hover:border-brand-500'
                      placeholder='Banner Design'
                    />
                  </div>

                  <div className='col-span-2'>
                    <label
                      htmlFor={`items.${index}.quantity`}
                      className='body-100 block text-brand-400 dark:text-brand-300'
                    >
                      Qty.
                    </label>
                    <input
                      type='number'
                      {...methods.register(`items.${index}.quantity`, {
                        valueAsNumber: true,
                      })}
                      id={`items.${index}.quantity`}
                      className='body-100 mt-6 w-full rounded-lg border border-brand-100 bg-neutral-100 p-6 font-bold  text-brand-900 outline-none focus:border-brand-500 hover:border-brand-500 dark:border-brand-600 dark:bg-brand-700 dark:text-neutral-100 dark:focus:border-brand-500 dark:hover:border-brand-500 sm:px-8'
                      placeholder='1'
                      min='10'
                    />
                  </div>

                  <div className='col-span-3 sx:col-span-2'>
                    <label
                      htmlFor={`items.${index}.price`}
                      className='body-100 block text-brand-400 dark:text-brand-300'
                    >
                      Price
                    </label>
                    <input
                      type='number'
                      {...methods.register(`items.${index}.price`, {
                        valueAsNumber: true,
                      })}
                      id={`items.${index}.price`}
                      className='body-100 mt-6 w-full rounded-lg border border-brand-100 bg-neutral-100 px-8 py-6 font-bold text-brand-900 outline-none focus:border-brand-500 hover:border-brand-500 dark:border-brand-600 dark:bg-brand-700 dark:text-neutral-100 dark:focus:border-brand-500 dark:hover:border-brand-500'
                      placeholder='200.00'
                    />
                  </div>

                  <div className='col-span-2'>
                    <label
                      htmlFor={`items.${index}.total`}
                      className='body-100 block text-brand-400 dark:text-brand-300'
                    >
                      Total
                    </label>

                    <output
                      {...methods.register(`items.${index}.total`, {
                        valueAsNumber: true,
                      })}
                      htmlFor={`items.${index}.price items.${index}.quantity`}
                      id={`items.${index}.total`}
                      className='body-100 mt-[3.1rem] block font-bold text-[#888EB0]'
                    >
                      {formatPrice(totalPrice(field.quantity, field.price))}
                    </output>
                  </div>

                  <div className='col-span-1 mt-[4.2rem]'>
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
                  id: uuidv4(),
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
    </FormProvider>
  );
};

export { CreateInvoiceForm };
