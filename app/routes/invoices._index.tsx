import { InvoicesDesktop } from "@/components/templates.invoices.desktop";
import { InvoicesMobile } from "@/components/templates.invoices.mobile";
import { MetaFunction } from "@remix-run/node";

type Props = {};

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
    <main aria-labelledby="page-heading" className="min-h-screen w-full">
      <div className="mt-12" />

      <InvoicesDesktop className="hidden flex-col gap-12 sm:flex" />
      <InvoicesMobile className="flex flex-col gap-12 sm:hidden" />
    </main>
  );
}

export default PageRoute;
