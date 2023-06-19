import { SubmitHandler } from 'react-hook-form';
import { ZodType, z } from 'zod';

export const terms = [
  { value: 1, id: '1' },
  { value: 7, id: '7' },
  { value: 14, id: '14' },
  { value: 30, id: '30' },
];

export const invoiceFilters: InvoiceFilter[] = [
  { value: 'PAID', id: 'PAID' },
  { value: 'PENDING', id: 'PENDING' },
  { value: 'DRAFT', id: 'DRAFT' },
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
const GenericItemSchema = z.object({
  id: z.string().optional(),
  name: GenericStringContraint.nonempty(),
  quantity: z.number().nonnegative().int().step(1),
  price: z.number().nonnegative().step(0.01),
  total: z.number().nonnegative().optional(),
});

const GenericAddressSchema = z.object({
  id: z.string().optional(),
  street: GenericStringContraint.nonempty(),
  city: GenericStringContraint.nonempty(),
  country: GenericStringContraint.nonempty(),
  postCode: GenericStringContraint.nonempty().toUpperCase(),
});

const AuthFormSchema = z.object({
  email: z
    .string()
    .nonempty()
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
  message: "Oops! The passwords don't match",
});

export const LoginFormSchema = AuthFormSchema.pick({
  email: true,
  password: true,
});

export const InvoiceFormSchema = z.object({
  clientAddress: GenericAddressSchema,
  clientEmail: GenericEmailContraint,
  clientName: GenericStringContraint.nonempty(),
  description: GenericStringContraint.nonempty(),
  issued: z.string().datetime().optional(),
  items: GenericItemSchema.array().nonempty(),
  paymentDue: z.string().datetime().optional(),
  paymentTerms: z.number().nonnegative().int().optional(),
  senderAddress: GenericAddressSchema,
  status: z.enum(['DRAFT', 'PENDING', 'PAID']).optional(),
  tag: z.string().optional(),
  total: z.number().nonnegative().optional(),
  userId: z.string().optional(),
});

export type RHFSubmitHandler<T extends ZodType<any, any, any>> = SubmitHandler<
  z.infer<T>
>;
