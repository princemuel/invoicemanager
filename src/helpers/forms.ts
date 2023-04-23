import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, UseFormProps, useForm } from 'react-hook-form';
import { ZodType, z } from 'zod';

export function useZodForm<T extends z.ZodType>(
  props: Omit<UseFormProps<T['_input']>, 'resolver'> & {
    schema: T;
  }
) {
  return useForm<T['_input']>({
    ...props,
    resolver: zodResolver(props.schema, undefined, {
      // This makes it so we can use `.transform()`s on the schema without same transform getting applied again when it reaches the server
      raw: true,
    }),
  });
}

export const terms = [
  { value: 1, id: 1 },
  { value: 7, id: 7 },
  { value: 14, id: 14 },
  { value: 30, id: 30 },
];

export const statuses = [
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
const AddressSchema = z.object({
  street: GenericStringContraint.nonempty(),
  city: GenericStringContraint.nonempty(),
  country: GenericStringContraint.nonempty(),
  postCode: GenericStringContraint.nonempty().toUpperCase(),
});

const GenericItemSchema = z.object({
  id: z.string().optional(),
  name: GenericStringContraint.nonempty(),
  quantity: z.number().nonnegative().int().step(1),
  price: z.number().nonnegative().step(0.01),
  total: z.number().nonnegative().optional(),
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
  clientAddress: AddressSchema,
  clientEmail: GenericEmailContraint,
  clientName: GenericStringContraint.nonempty(),
  description: GenericStringContraint.nonempty(),
  issueDate: z.string().datetime().optional(),
  items: GenericItemSchema.array().nonempty(),
  paymentDue: z.string().datetime().optional(),
  paymentTerms: z.number().nonnegative().int().optional(),
  senderAddress: AddressSchema,
  status: z.enum(['DRAFT', 'PENDING', 'PAID']).optional(),
  tag: z.string().optional(),
  total: z.number().nonnegative().optional(),
  userId: z.string().optional(),
});

export type RHFSubmitHandler<T extends ZodType<any, any, any>> = SubmitHandler<
  z.infer<T>
>;

const isValidId = (id: string): id is `${string}/${string}` => {
  return id.split('/').length === 2;
};

const baseSchema = z.object({
  id: z.string().refine(isValidId),
});

type Input = z.input<typeof baseSchema> & {
  children: Input[];
};

type Output = z.output<typeof baseSchema> & {
  children: Output[];
};

const schema: z.ZodType<Output, z.ZodTypeDef, Input> = baseSchema.extend({
  children: z.lazy(() => schema.array()),
});

// type NestedKey<O extends Record<string, unknown>> = {
//   [K in Extract<keyof O, string>]: O[K] extends Array<any>
//     ? K
//     : O[K] extends Record<string, unknown>
//     ? `${K}` | `${K}.${NestedKey<O[K]>}`
//     : K;
// }[Extract<keyof O, string>];

// type nestedKeys = NestedKey<InvoiceFormSchema>;
