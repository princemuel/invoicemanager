import isPostalCode from 'validator/es/lib/isPostalCode';
import { z } from 'zod';
import { StringContraint } from './constraints';

export const BaseUserSchema = z.object({
  id: z.string(),
  kindeId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),

  email: z.string().toLowerCase().trim().nullable(),
  firstName: z.string().trim().nullable(),
  lastName: z.string().trim().nullable(),
  image: z.string().trim().nullish(),
});

export const BaseInvoiceSchema = z.object({
  issued: z.coerce.date(),
  paymentDue: z.coerce.date().optional(),
  paymentTerms: z.coerce.number().nonnegative().int().optional(),
  status: z.string().optional(),
  slug: z.string().optional(),
  total: z.coerce.number().nonnegative().optional(),
  userId: z.string().optional(),
});

export const AddressSchema = z.strictObject({
  // id: z.string().optional(),
  street: StringContraint,
  city: StringContraint,
  country: StringContraint,
  postCode: StringContraint.toUpperCase().refine(
    (value) => isPostalCode(value, 'any'),
    {
      message: 'Must be 5 or more characters',
    }
  ),
});

export const ItemSchema = z.object({
  id: z.string().optional(),
  name: StringContraint,
  quantity: z.coerce.number().nonnegative().int().step(1),
  price: z.coerce.number().nonnegative().step(0.01),
  total: z.coerce.number().nonnegative().optional(),
});
