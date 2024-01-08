import { db } from "@/database/db.server";
import { invariant } from "@/helpers/invariant";
import { getAuth } from "@clerk/remix/ssr.server";
import type { ActionFunctionArgs } from "@remix-run/node";
import {
  redirectWithError,
  redirectWithSuccess,
  redirectWithWarning,
} from "remix-toast";

export async function action(args: ActionFunctionArgs) {
  invariant(args.params.slug, "Missing slug parameter");

  const { userId } = await getAuth(args);
  if (!userId)
    return redirectWithWarning(
      "/sign-in?redirect_url=" + args.request.url,
      "Invalid Session. Please sign in",
    );

  try {
    const invoice = await db.invoice.delete({
      where: { slug: args.params.slug, userId },
    });

    return redirectWithSuccess(
      "/",
      `Invoice with Id #${invoice?.slug} deleted`,
    );
  } catch (e) {
    return redirectWithError("/", `Request Failed`);
  }
}
