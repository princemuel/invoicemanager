import { EmailContraint, StringContraint } from './constraints';
import { AddressSchema, BaseInvoiceSchema, ItemSchema } from './schema';
import { z } from 'zod';

export const InvoiceSchema = BaseInvoiceSchema.extend({
  clientName: StringContraint,
  clientEmail: EmailContraint,
  clientAddress: AddressSchema,
  senderAddress: AddressSchema,

  issued: z.date(),
  description: StringContraint,
  items: ItemSchema.array().nonempty(),
});
