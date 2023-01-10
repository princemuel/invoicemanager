import dedent from "dedent";
import { objectType } from "nexus";

export const Invoice = objectType({
  name: "Invoice",
  description: dedent`The object containing metadata about the invoice e.g. items purchased, when the payment is due, client address information, the current status, et cetera`,
  definition(t) {
    t.nonNull.id("id", { description: "Id of the invoice" });
    t.nonNull.datetime("createdAt", {
      description: `The exact time the invoice was created`,
    });
    t.datetime("updatedAt", {
      description: `The exact time the invoice was updated`,
    });
    t.datetime("paymentDue", {
      description: `When the payment of the items listed in the invoice is due`,
    });
    t.string("tag", {
      description: `id used on the client to tag the invoice`,
    });
    t.string("description", {
      description: `A high level description of the items listed in the invoice`,
    });
    t.int("paymentTerms", {
      description: `The number of days before an invoice's payment grace period expires. Can be 1, 7, 14 or 30 days`,
    });
    t.string("clientName");
    t.string("clientEmail");
    t.field("status", { type: "Status" });
    t.field("senderAddress", { type: "Address" });
    t.field("clientAddress", { type: "Address" });
    t.float("total");
    t.list.field("items", { type: "InvoiceItem" });
  },
});
