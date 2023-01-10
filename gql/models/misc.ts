import { DateTimeResolver } from "graphql-scalars";
import { asNexusMethod, enumType, objectType } from "nexus";

export const DateTime = asNexusMethod(DateTimeResolver, "datetime");

export const Address = objectType({
  name: "Address",
  definition(t) {
    t.string("street");
    t.string("city");
    t.string("postCode");
    t.string("country");
  },
});
export const Role = enumType({
  name: "Role",
  members: ["DRAFT", "PENDING", "PAID"],
});

export const Item = objectType({
  name: "Item",
  definition(t) {
    t.nonNull.string("name");
    t.int("quantity");
    t.float("price");
    t.float("total");
  },
});

export const Status = enumType({
  name: "Status",
  members: ["DRAFT", "PENDING", "PAID"],
});
