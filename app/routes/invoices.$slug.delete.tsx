import { db } from "@/database/db.server";
import { invariant } from "@/helpers/invariant";
import { getAuth } from "@clerk/react-router/ssr.server";
import { redirectWithError, redirectWithSuccess, redirectWithWarning } from "remix-toast";
import type { Route } from "./+types/invoices.$slug.delete";

export async function action(args: Route.ActionArgs) {
  invariant(
    args.params.slug,
    `Expected \`slug\` to be of type \`%s\` but received type \`%s\``,
    "string",
    args.params.slug,
  );

  const { isAuthenticated, userId } = await getAuth(args);
  if (!isAuthenticated)
    return redirectWithWarning(
      "/sign-in?redirect_url=" + args.request.url,
      "Invalid Session. Please sign in",
    );

  try {
    const invoice = await db.invoice.delete({
      where: { slug: args.params.slug, userId },
    });

    return redirectWithSuccess("/", `Invoice with Id #${invoice?.slug} deleted`);
  } catch (e) {
    return redirectWithError("/", `Request Failed`);
  }
}
