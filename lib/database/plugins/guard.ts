import { nullabilityGuardPlugin } from "nexus";

export const guardPlugin = nullabilityGuardPlugin({
  // @ts-expect-error
  onGuarded({ root, ctx, info }) {
    // This could report to a service like Sentry, or log internally - up to you!
    console.error(
      `Error: Saw a null value for non-null field ${info.parentType.name}.${
        info.fieldName
      } ${root ? `(${root.id || root._id})` : ""}`
    );
  },
  // A map of `typeNames` to the values we want to replace with if a "null" value
  // is seen in a position it shouldn't be. These can also be provided as a config property
  // for the `objectType` / `enumType` definition, as seen below.
  fallbackValues: {
    Int: () => 0,
    String: () => "",
    ID: ({ info }) => `${info.parentType.name}:N/A`,
    Boolean: () => false,
    Float: () => 0,
    DateTime: () => `${new Date(Date.now()).toISOString()}`,
  },
});
