import { IconArrowDown, IconPlus } from "@/common";
import {
  buildItemCountMsg,
  formatAmount,
  hasValues,
  tw,
} from "@/helpers/utils";
import type { loader } from "@/routes/_index";
import { Transition } from "@headlessui/react";
import { Link, useLoaderData } from "@remix-run/react";
import { format } from "date-fns";
import { useState } from "react";
import { Button } from "./button";
import { InvoiceFilters } from "./invoice-filters";
import { Text } from "./text";

type Props = { className?: string };

const generateMessage = buildItemCountMsg("{{ count }} invoice(s)");

export function InvoicesMobile({ className }: Props) {
  const data = useLoaderData<typeof loader>();
  const invoices = data.invoices;

  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className={tw("", className)}>
      <header className="container">
        <div className="flex gap-6 2xs:justify-between">
          <div className="">
            <Text as="h1" id="page-heading" size="lg" weight="bold">
              Invoices
            </Text>

            <Text as="p" aria-live="polite" variant="secondary">
              {generateMessage(invoices)}
            </Text>
          </div>

          <div className="relative mt-1 flex flex-col">
            <button
              type="button"
              className="flex w-full items-center gap-6 self-center"
              onClick={() => setIsVisible((state) => !state)}
            >
              <Text as="span" weight="bold" className="inline-block truncate">
                Filter
              </Text>

              <span
                className={tw("pointer-events-none transform-gpu", {
                  "-rotate-180": isVisible,
                })}
              >
                <IconArrowDown />
              </span>
            </button>

            <Transition
              show={isVisible}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <div className="absolute z-10 mt-4 w-full shadow-200 dark:shadow-300">
                <InvoiceFilters />
              </div>
            </Transition>
          </div>

          <Button variant="primary" className="px-2 max-2xs:ml-auto" asChild>
            <Link to="/invoices/create">
              <span className="grid aspect-square place-content-center rounded-full bg-white p-2">
                <IconPlus />
              </span>
              <span>New</span>
            </Link>
          </Button>
        </div>
      </header>

      <section aria-label="Invoices" className="container">
        <ul className="flex flex-col gap-6">
          {hasValues(invoices) ?
            invoices.map((invoice) => (
              <li
                key={invoice.slug}
                className="rounded-lg bg-white px-6 py-8 shadow-100 transition-colors duration-300 ease-in hocus:border hocus:border-brand-500 dark:bg-brand-700"
              >
                <Link
                  to={`invoices/${invoice?.slug}`}
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
