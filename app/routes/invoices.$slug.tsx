import { IconArrowLeft } from "@/common";
import { Button } from "@/components/button";
import { InvoiceDesktop } from "@/components/templates.invoice.desktop";
import { InvoiceMobile } from "@/components/templates.invoice.mobile";
import { db } from "@/database/db.server";
import { invariant } from "@/helpers/invariant";
import { omitFields } from "@/helpers/utils";
import { StringContraint } from "@/lib/schema";
import { getAuth } from "@clerk/react-router/ssr.server";
import { data, Link } from "react-router";
import { redirectWithError, redirectWithSuccess, redirectWithWarning } from "remix-toast";

import type { Route } from "./+types/invoices.$slug";

export default function Page({ actionData, loaderData }: Route.ComponentProps) {
  return (
    <main aria-labelledby="page-heading" className="relative w-full">
      <div className="mt-16 flex flex-col gap-8">
        <div className="container">
          <div>
            <Button className="h-auto w-auto gap-x-3" asChild>
              <Link to="/">
                <span>
                  <IconArrowLeft />
                </span>
                <span>Go Back</span>
              </Link>
            </Button>
          </div>
        </div>

        <InvoiceMobile className="flex flex-col gap-4 sm:hidden" />
        <InvoiceDesktop className="hidden flex-col gap-4 sm:flex" />
      </div>
    </main>
  );
}

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

  const formData = await args.request.formData();

  const status = StringContraint.parse(formData.get("status"));

  try {
    const invoice = await db.invoice.update({
      where: { slug: args.params.slug, userId },
      data: { status },
    });

    return redirectWithSuccess(
      `/invoices/${invoice?.slug}`,
      `Invoice #${invoice?.slug?.toUpperCase()} Update Success`,
    );
  } catch (error) {
    return redirectWithError(`/`, `Request Failed`);
  }
}

export async function loader(args: Route.LoaderArgs) {
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
    const response = await db.invoice.findUniqueOrThrow({
      where: { slug: args.params.slug, userId },
    });

    const invoice = omitFields(response, ["createdAt", "updatedAt", "id"]);

    return data({ invoice: invoice });
  } catch (e: any) {
    throw new Response(e.message, {
      status: 404,
      statusText: "NotFound",
    });
  }
}
