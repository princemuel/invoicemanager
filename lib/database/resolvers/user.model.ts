import { enumType, objectType } from "nexus";

export const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.id("id", { description: "Id of the user" });
    t.nonNull.datetime("createdAt", {
      description: `The exact time the user was created`,
    });
    t.datetime("updatedAt", {
      description: `The exact time the user was updated`,
    });
    t.string("firstName", { description: "The first name of the user" });
    t.string("lastName", { description: "The last name of the user" });
    t.nonNull.string("email", { description: "The password of the user" });
    t.string("password", { description: "The password of the user" });
    t.string("photo", { description: "The avatar of the user" });
  },
});

export const Role = enumType({
  name: "Role",
  description: "The current role of the user",
  members: ["USER", "ADMIN"],
});
