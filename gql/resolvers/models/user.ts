import { objectType } from "nexus";

export const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.id("id");
    t.nonNull.datetime("createdAt");
    t.nonNull.datetime("updatedAt");
    t.string("firstName");
    t.string("lastName");
    t.nonNull.string("email");
    t.string("imageUrl");
    t.nonNull.field("role", { type: "Role" });
  },
});
