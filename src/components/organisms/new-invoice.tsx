import { DateTime, formatPrice, totalPrice } from '@src/helpers';
import { useZodForm } from '@src/hooks';
import { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useFieldArray } from 'react-hook-form';
import { v4 as uuid } from 'uuid';
import { z } from 'zod';
import { Text } from '../atoms';
import { Calendar, Dropdown, FormInput } from '../molecules';

type Props = {};

const terms = [
  { value: 1, id: uuid() },
  { value: 7, id: uuid() },
  { value: 14, id: uuid() },
  { value: 30, id: uuid() },
];

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

const NewInvoiceForm = (props: Props) => {
  const [selected, setSelected] = useState(terms[0].value);
  const [selectedDate, setSelectedDate] = useState(DateTime.TODAY);
  const [isShowing, setIsShowing] = useState(false);

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

  useEffect(() => {
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
              htmlFor='updatedAt'
              className='body-100 block text-brand-400 dark:text-brand-300'
            >
              Issue Date
            </label>

            <Calendar
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
              selected={selected}
              setSelected={setSelected}
            />
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
    </FormProvider>
  );
};

export { NewInvoiceForm };
