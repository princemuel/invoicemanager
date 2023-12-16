import { InvoicesDesktop } from "@/components/templates.invoices.desktop";
import { InvoicesMobile } from "@/components/templates.invoices.mobile";
import { MetaFunction, json } from "@remix-run/node";

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
    <main aria-labelledby="page-heading" className="w-full">
      <div className="mt-12" />

      <InvoicesDesktop className="hidden flex-col gap-12 sm:flex" />
      <InvoicesMobile className="flex flex-col gap-12 sm:hidden" />
    </main>
  );
}

export default PageRoute;

type Order = {
  slug: string;
  total: number;
  clientName: string;
  status: string;
  paymentDue: string;
};

export async function loader() {
  const invoices = await new Promise<Order[]>((resolve) =>
    setTimeout(
      () =>
        resolve([
          {
            slug: "1a7b8c",
            total: 100.0,
            clientName: "John Doe",
            status: "pending",
            paymentDue: "2023-01-31",
          },
          {
            slug: "4e2a7f",
            total: 75.5,
            clientName: "Jane Smith",
            status: "completed",
            paymentDue: "2023-02-15",
          },
          {
            slug: "9c3f72",
            total: 200.0,
            clientName: "Bob Johnson",
            status: "shipped",
            paymentDue: "2023-03-10",
          },
          {
            slug: "5b1a2e",
            total: 50.25,
            clientName: "Alice Brown",
            status: "pending",
            paymentDue: "2023-01-25",
          },
          {
            slug: "8c6d1a",
            total: 150.75,
            clientName: "Charlie Davis",
            status: "completed",
            paymentDue: "2023-02-28",
          },
        ]),
      2000,
    ),
  );

  return json({ invoices: invoices ?? [] });
}
