import { InvoicesDesktop } from "@/components/templates.invoices.desktop";
import { InvoicesMobile } from "@/components/templates.invoices.mobile";
import { db } from "@/database/db.server";
import { getAuth } from "@clerk/remix/ssr.server";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";

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

function PageRoute() {
  return (
    <main aria-labelledby="page-heading" className="w-full">
      <div className="mt-12" />

      <InvoicesDesktop className="hidden flex-col gap-12 sm:flex" />
      <InvoicesMobile className="flex flex-col gap-12 sm:hidden" />
    </main>
  );
}

export default PageRoute;

export async function loader(args: LoaderFunctionArgs) {
  const { userId } = await getAuth(args);
  if (!userId) return redirect("/sign-in?redirect_url=" + args.request.url);

  const url = new URL(args.request.url);
  const statuses = url.searchParams.getAll("status");

  const response = await db.invoice.findMany({
    where: { userId: userId },
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
      response.filter((item) =>
        statuses.some((status) => item.status === status),
      )
    : response;

  return json({ invoices: invoices ?? [] });
}
