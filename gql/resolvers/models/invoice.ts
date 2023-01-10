import { objectType } from "nexus";

export const Invoice = objectType({
  name: "Invoice",
  description: `The object containing metadata about the invoice e.g. items purchased, when the payment is due, client address information, the current status, et cetera`,
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
      description: `Unique id sequence used to tag the invoice`,
    });
    t.string("description", {
      description: `A high level description of the items listed in the invoice`,
    });
    t.int("paymentTerms", {
      description: `The number of days before an invoice's payment grace period expires. Can be 1, 7, 14 or 30 days`,
    });
    t.string("clientName", {
      description: "The name of the person receiving the invoice",
    });
    t.string("clientEmail"),
      { description: "The email of the person receiving the invoice" };
    t.field("status", {
      type: "Status",
      description: "Current payment status of the items listed in the invoice",
    });
    t.field("senderAddress", {
      type: "Address",
      description: "The address of the person sending the invoice",
    });
    t.field("clientAddress", {
      type: "Address",
      description: "The address of the person receiving the invoice",
    });
    t.float("total", {
      description:
        "The grand total of the price of the items listed in the invoice",
    });
    t.list.field("items", {
      type: "InvoiceItem",
      description: "The items listed in the invoice",
    });
  },
});
