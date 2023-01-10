import { list, nonNull, nullable, queryField } from "nexus";

export const invoices = queryField("invoices", {
  type: nullable(list(nonNull("Invoice"))),
  resolve: async (root, args, ctx) => {
    return [];
  },
});

export const invoice = queryField("invoice", {
  type: nullable("Invoice"),
  resolve: async (root, args, ctx) => {
    return null;
  },
});
