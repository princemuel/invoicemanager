import { z } from 'zod';
import { InvoiceSchema } from './invoice';

declare global {
  type InvoiceTypeSafe = z.infer<typeof InvoiceSchema>;
}
