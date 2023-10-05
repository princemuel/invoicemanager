import { EmailContraint, StringContraint } from './constraints';
import { AddressSchema, BaseInvoiceSchema, ItemSchema } from './schema';

export const InvoiceSchema = BaseInvoiceSchema.extend({
  clientName: StringContraint,
  clientEmail: EmailContraint,
  clientAddress: AddressSchema,
  senderAddress: AddressSchema,

  description: StringContraint,
  items: ItemSchema.array().nonempty(),
});
