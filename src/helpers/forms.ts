import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, UseFormProps, useForm } from 'react-hook-form';
import { v4 as uuid } from 'uuid';
import { ZodType, z } from 'zod';

export function useZodForm<TSchema extends z.ZodType>(
  props: Omit<UseFormProps<TSchema['_input']>, 'resolver'> & {
    schema: TSchema;
  }
) {
  const form = useForm<TSchema['_input']>({
    ...props,
    resolver: zodResolver(props.schema, undefined, {
      // This makes it so we can use `.transform()`s on the schema without same transform getting applied again when it reaches the server
      raw: true,
    }),
  });

  return form;
}

export const terms = [
  { value: 1, id: uuid() },
  { value: 7, id: uuid() },
  { value: 14, id: uuid() },
  { value: 30, id: uuid() },
];

// Zod Constraints
export const GenericStringContraint = z
  .string()
  .min(1, { message: "Can't be empty" })
  .min(3, { message: 'Must 3 or more characters' })
  .trim();

export const GenericEmailContraint = z
  .string()
  .email({ message: 'Invalid email address' })
  .min(1, { message: "Can't be empty" })
  .min(6, { message: 'Must 6 or more characters' })
  .toLowerCase()
  .trim();

// Zod Schemas
const AddressSchema = z.object({
  street: GenericStringContraint,
  city: GenericStringContraint,
  country: GenericStringContraint,
  postCode: GenericStringContraint,
});

const GenericItemSchema = z.object({
  id: z.string(),
  name: GenericStringContraint,
  quantity: z.number().nonnegative().int().step(1),
  price: z.number().nonnegative(),
  total: z.number().nonnegative(),
});

const AuthFormSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .min(1, { message: "Can't be empty" })
    .min(6, { message: 'Must more than 6 characters' })
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(1, "Can't be empty")
    .min(8, 'Must be more than 8 characters')
    .max(32, 'Must be less than 32 characters')
    .trim(),
  countersign: z.string().min(1, "Can't be empty").trim(),
});

export const RegisterFormSchema = AuthFormSchema.pick({
  email: true,
  password: true,
  countersign: true,
}).refine((data) => data.password === data.countersign, {
  path: ['countersign'],
  message: "Oops! The entered passwords don't match",
});

export const LoginFormSchema = AuthFormSchema.pick({
  email: true,
  password: true,
});

export const InvoiceFormSchema = z.object({
  tag: z.string(),
  userId: z.string(),

  updatedAt: z.string().datetime(),
  paymentDue: z.string().datetime(),

  description: GenericStringContraint,
  paymentTerms: z.number().nonnegative().int(),

  clientName: z.string(),
  clientEmail: GenericEmailContraint,
  status: z.enum(['DRAFT', 'PENDING', 'PAID']),

  senderAddress: AddressSchema,
  clientAddress: AddressSchema,

  items: GenericItemSchema.array().nonempty(),
  total: z.number().nonnegative(),
});

export type RHFSubmitHandler<T extends ZodType<any, any, any>> = SubmitHandler<
  z.infer<T>
>;
