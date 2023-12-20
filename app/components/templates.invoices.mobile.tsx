import { IconPlus } from "@/common";
import {
  buildItemCountMsg,
  formatAmount,
  hasValues,
  tw,
} from "@/helpers/utils";
import { loader } from "@/routes/invoices._index";
import { Link, useLoaderData } from "@remix-run/react";
import { format } from "date-fns";
import { Button } from "./button";
import { InvoiceFilters } from "./invoice-filters";
import { Text } from "./text";

type Props = { className?: string };

const generateMessage = buildItemCountMsg("{{ count }} invoice(s)");

export function InvoicesMobile({ className }: Props) {
  const data = useLoaderData<typeof loader>();
  const invoices = data.invoices;

  return (
    <div className={tw("", className)}>
      <header className="container">
        <div className="flex items-center">
          <div className="flex-1">
            <Text as="h1" id="heading" size="xl">
              Invoices
            </Text>

            <Text as="p" aria-live="polite" variant="secondary">
              {generateMessage(invoices)}
            </Text>
          </div>

          <div className="flex items-center gap-6">
            <InvoiceFilters />

            <Button variant="primary" className="px-2 " asChild>
              <Link to="create">
                <span className="grid aspect-square place-content-center rounded-full bg-white p-2">
                  <IconPlus />
                </span>
                <span>New</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <section aria-label="Invoices" className="container">
        <ul className="flex flex-col gap-6">
          {hasValues(invoices) ?
            invoices.map((invoice) => (
              <li
                key={invoice.slug}
                className="rounded-lg bg-white px-6 py-8 shadow-100 transition-colors duration-300 ease-in hover:border hover:border-brand-500 focus:border focus:border-brand-500 dark:bg-brand-700"
              >
                <Link
                  to={invoice?.slug}
                  className="grid grid-cols-2 grid-rows-3"
                >
                  <Text as="p" weight="bold" className="uppercase">
                    <span className="text-brand-400">#</span>
                    <span>{invoice?.slug}</span>
                  </Text>

                  <Text
                    as="p"
                    variant="primary"
                    aria-live="polite"
                    className="self-center"
                  >
                    <span>Due</span>{" "}
                    <time
                      dateTime={new Date(invoice?.paymentDue).toISOString()}
                    >
                      {format(new Date(invoice?.paymentDue), "dd MMM yyyy")}
                    </time>
                  </Text>

                  <Text
                    as="p"
                    variant="accent"
                    className="col-start-2 col-end-3 row-start-1 justify-self-end"
                  >
                    {invoice?.clientName}
                  </Text>

                  <Text
                    as="p"
                    size="md"
                    weight="bold"
                    className="row-start-3 row-end-4 self-end"
                  >
                    {formatAmount(invoice?.total)}
                  </Text>

                  <Button
                    type="button"
                    className={tw(
                      "col-start-2 col-end-3 row-start-3 row-end-4 !h-10 !w-[6.5rem] justify-around justify-self-end !px-4 !py-3 capitalize ",
                      invoice.status === "draft" &&
                        "bg-accent-300/[0.06] text-accent-300 dark:bg-brand-100/[0.06] dark:text-brand-100",
                      invoice.status === "pending" &&
                        "bg-accent-400/[0.06] text-accent-400",
                      invoice.status === "paid" &&
                        "bg-accent-500/[0.06] text-accent-500",
                    )}
                  >
                    <span className="h-2 w-2 rounded-full bg-current" />
                    <span>{invoice?.status}</span>
                  </Button>
                </Link>
              </li>
            ))
          : <li className="flex min-h-full items-center justify-center">
              <article className="flex flex-col items-center gap-20 text-center">
                <img
                  src="/illustration-empty.svg"
                  width="242"
                  height="200"
                  className="w-full"
                  alt={"Invoices List Empty"}
                />

                <div className="flex flex-col items-center gap-5 px-10">
                  <Text as="h2" size="lg">
                    There is nothing here
                  </Text>

                  <Text as="p" variant="secondary" className="max-w-[22rem]">
                    Create an invoice by clicking the&nbsp;
                    <em className="font-bold">New Invoice</em> button and get
                    started
                  </Text>
                </div>
              </article>
            </li>
          }
        </ul>
      </section>
    </div>
  );
}
