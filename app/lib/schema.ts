import { z } from "zod";

export const StringContraint = z
  .string()
  .min(1, { message: "Can't be empty" })
  .min(3, { message: "Must 3 or more characters" })
  .trim();

export const EmailContraint = z
  .string()
  .email({ message: "Invalid email address" })
  .min(1, { message: "Can't be empty" })
  .min(6, { message: "Must 6 or more characters" })
  .toLowerCase()
  .trim();

export const BaseInvoiceSchema = z.object({
  slug: z.string(),
  paymentDue: z.string().datetime(),
  paymentTerms: z.coerce.number().int().nonnegative(),
  status: z.string(),
  total: z.coerce.number().nonnegative(),
  userId: z.string(),
});

export const AddressSchema = z.object({
  street: StringContraint,
  city: StringContraint,
  country: StringContraint,
  postCode: StringContraint.toUpperCase().refine(
    async (value) =>
      await import("validator")
        .then((response) => response.default)
        .then((response) => response.isPostalCode(value, "any")),
  ),
});

export const ItemSchema = z.object({
  id: z.string(),
  name: StringContraint,
  quantity: z.coerce.number().nonnegative().int().step(1),
  price: z.coerce.number().nonnegative().step(0.01),
  total: z.coerce.number().nonnegative(),
});
