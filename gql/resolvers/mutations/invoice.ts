import { mutationField, nullable } from "nexus";

export const createInvoice = mutationField("createInvoice", {
  type: nullable("Invoice"),
  resolve: async (root, args, ctx) => {
    return null;
  },
});

export const updateInvoice = mutationField("updateInvoice", {
  type: nullable("Invoice"),
  resolve: async (root, args, ctx) => {
    return null;
  },
});

export const deleteInvoice = mutationField("deleteInvoice", {
  type: nullable("Invoice"),
  resolve: async (root, args, ctx) => {
    return null;
  },
});

export const createInvoiceItem = mutationField("createInvoiceItem", {
  type: nullable("InvoiceItem"),
  resolve: async (root, args, ctx) => {
    return null;
  },
});

export const deleteInvoiceItem = mutationField("deleteInvoiceItem", {
  type: nullable("InvoiceItem"),
  resolve: async (root, args, ctx) => {
    return null;
  },
});
