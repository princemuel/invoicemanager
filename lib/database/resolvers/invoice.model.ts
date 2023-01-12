import { enumType, objectType } from "nexus";

export const Invoice = objectType({
  name: "Invoice",
  description: `The object containing metadata about the invoice e.g. items purchased, when the payment is due, client address information, the current status, et cetera`,
  definition(t) {
    t.id("id", { description: "Id of the invoice" });
    t.datetime("createdAt", {
      description: `The exact time the invoice was created`,
    });
    t.datetime("updatedAt", {
      description: `The exact time the invoice was updated`,
    });
    t.string("paymentDue", {
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
    t.string("clientEmail", {
      description: "The email of the person receiving the invoice",
    });
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

    t.nonNull.list.field("items", {
      type: "InvoiceItem",
      description: "The items listed in the invoice",
      resolve: async (root, args, ctx) => {
        return ctx.db.invoice
          .findUniqueOrThrow({
            where: {
              // !!! NOTE: make sure to refactor this
              id: root.id as string,
            },
          })
          .items();
      },
    });
  },
});

export const Address = objectType({
  name: "Address",
  description:
    "The address object used for both the client and sender's address information. It contains the person's street, city, post code and country data",
  definition(t) {
    t.string("street", { description: "The street where the person resides" });
    t.string("city", { description: "The city where the person lives in" });
    t.string("postCode", {
      description: "The post code of the person's state",
    });
    t.string("country", {
      description: "The country where the person is located",
    });
  },
});

export const InvoiceItem = objectType({
  name: "InvoiceItem",
  description: "An item listed in the invoice",
  definition(t) {
    t.string("name", { description: "The name of this item" });
    t.int("quantity", { description: "The amount of this item purchased" });
    t.float("price", { description: "The price of this item" });
    t.float("total", {
      description:
        "The price of this item multiplied by the total number of this item purchased",
    });
  },
});

export const Status = enumType({
  name: "Status",
  description: "The current status of the invoice",
  members: ["DRAFT", "PENDING", "PAID"],
});
