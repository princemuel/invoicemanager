import { InvoicesDesktop } from "@/components/templates.invoices.desktop";
import { InvoicesMobile } from "@/components/templates.invoices.mobile";
import { db } from "@/database/db.server";
import { getAuth } from "@clerk/react-router/ssr.server";
import { type MetaFunction } from "react-router";
import { redirectWithWarning } from "remix-toast";

import type { Route } from "./+types/_index";

export const meta: MetaFunction = () => {
  return [
    { title: "Invoices - Invoice Manager" },
    {
      property: "og:title",
      content: "Invoices - Invoice Manager",
    },
    {
      property: "og:description",
      content: "A list of all my past and current invoices",
    },
    {
      name: "description",
      content: "A list of all my past and current invoices",
    },
  ];
};

export async function loader(args: Route.LoaderArgs) {
  const { isAuthenticated, userId } = await getAuth(args);
  if (!isAuthenticated)
    return redirectWithWarning(
      "/sign-in?redirect_url=" + args.request.url,
      "Invalid Session. Please sign in",
    );

  try {
    const url = new URL(args.request.url);
    const statuses = url.searchParams.getAll("status");
    const response = await db.invoice.findMany({
      where: { userId },
      select: {
        slug: true,
        paymentDue: true,
        status: true,
        clientName: true,
        total: true,
      },
    });

    const invoices =
      statuses.length > 0 ?
        response.filter((item) => statuses.some((status) => item.status === status))
      : response;

    return { invoices };
  } catch (error) {
    return { invoices: [] };
  }
}

export default function Page({ actionData, loaderData }: Route.ComponentProps) {
  return (
    <main aria-labelledby="page-heading" className="w-full">
      <div className="mt-12" />

      <InvoicesDesktop className="hidden flex-col gap-12 sm:flex" />
      <InvoicesMobile className="flex flex-col gap-12 sm:hidden" />
    </main>
  );
}
