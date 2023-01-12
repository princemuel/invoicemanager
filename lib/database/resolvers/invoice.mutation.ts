import produce from "immer";
import { mutationField, nullable } from "nexus";
import ShortUniqueId from "short-unique-id";
import {
  CreateInvoiceInput,
  InvoiceWhereUniqueInput,
  UpdateInvoiceInput,
} from "./invoice.input";

const suid = new ShortUniqueId({
  dictionary: "hex",
});

export const createInvoice = mutationField("createInvoice", {
  type: nullable("Invoice"),
  args: { input: CreateInvoiceInput },
  resolve: async (_root, args, ctx) => {
    const nextState = produce(args.input, (draft) => {
      const milliseconds = 86400 * 1000 * Number(draft?.paymentTerms || 1);

      draft.tag = suid.randomUUID(6) as string;
      draft.paymentDue = new Date(Date.now() + milliseconds).toISOString();
    });

    return ctx.db.invoice.create({
      data: nextState,
    });
  },
});

export const updateInvoice = mutationField("updateInvoice", {
  type: "Invoice",
  args: {
    input: UpdateInvoiceInput,
    where: InvoiceWhereUniqueInput,
  },
  resolve: async (_root, args, ctx) => {
    return ctx.db.invoice.update({
      where: { id: args.where.id },
      data: {
        ...args.input,
      },
    });
  },
});

export const deleteInvoice = mutationField("deleteInvoice", {
  type: "Invoice",
  args: {
    where: InvoiceWhereUniqueInput,
  },
  resolve: async (_root, args, ctx) => {
    return ctx.db.invoice.delete({
      where: args.where,
    });
  },
});
