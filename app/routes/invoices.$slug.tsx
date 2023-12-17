import { IconArrowLeft } from "@/common";
import { Button } from "@/components/button";
import { InvoiceDesktop } from "@/components/templates.invoice.desktop";
import { InvoiceMobile } from "@/components/templates.invoice.mobile";
import { invariant } from "@/helpers/invariant";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Link } from "@remix-run/react";

function PageRoute() {
  return (
    <main aria-labelledby="page-heading" className="relative w-full">
      <div className="mt-16 flex flex-col gap-8">
        <div className="container">
          <Button className="h-auto w-auto gap-x-3" asChild>
            <Link to="/invoices">
              <span>
                <IconArrowLeft />
              </span>
              <span>Go Back</span>
            </Link>
          </Button>
        </div>

        <InvoiceMobile className="flex flex-col gap-4 sm:hidden" />
        <InvoiceDesktop className="hidden flex-col gap-4 sm:flex" />
      </div>
    </main>
  );
}

export default PageRoute;

export async function loader({ params }: LoaderFunctionArgs) {
  invariant(params.slug, "Missing slug param");
  const payload = params.slug;

  const invoices = await import("../database/db.json").then(
    (response) => response.default,
  );

  const invoice = invoices.find((item) => item.slug === payload);
  if (!invoice) throw new Response("Not Found", { status: 404 });

  return json({ invoice: invoice });
}
