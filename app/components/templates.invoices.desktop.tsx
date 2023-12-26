import { IconArrowDown, IconArrowRight, IconPlus } from "@/common";
import {
  buildItemCountMsg,
  formatAmount,
  hasValues,
  tw,
} from "@/helpers/utils";
import type { loader } from "@/routes/invoices._index";
import { Transition } from "@headlessui/react";
import { Link, useLoaderData } from "@remix-run/react";
import { format } from "date-fns";
import { useState } from "react";
import { Button } from "./button";
import { InvoiceFilters } from "./invoice-filters";
import { Text } from "./text";

type Props = { className?: string };

const generateMessage = buildItemCountMsg(
  "There {{ verb }} {{ count }} total invoice(s)",
);

export function InvoicesDesktop({ className }: Props) {
  const data = useLoaderData<typeof loader>();
  const invoices = data.invoices;

  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className={tw("", className)}>
      <header className="container">
        <div className="flex items-center">
          <div className="flex-1">
            <Text as="h1" id="page-heading" size="xl" weight="bold">
              Invoices
            </Text>
            <Text as="p" aria-live="polite" variant="secondary">
              {generateMessage(invoices)}
            </Text>
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              className="body-100 flex items-center gap-6 self-center font-bold"
              onClick={() => setIsVisible((state) => !state)}
            >
              <Text as="span" className="inline-block truncate">
                Filter by status
              </Text>

              <span
                className={tw(
                  "pointer-events-none transform-gpu",
                  isVisible && "-rotate-180",
                )}
              >
                <IconArrowDown xlinkTitle="filter invoices by status" />
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
              <InvoiceFilters />
            </Transition>

            <Button variant="primary" asChild>
              <Link to="create">
                <span className="grid aspect-square place-content-center rounded-full bg-white p-2">
                  <IconPlus />
                </span>
                <span>New Invoice</span>
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
                key={invoice?.slug}
                className="rounded-lg bg-white p-4 shadow-100 transition-colors duration-300 ease-in hover:border hover:border-brand-500 focus:border focus:border-brand-500 dark:bg-brand-700"
              >
                <Link
                  to={invoice?.slug}
                  className="grid grid-flow-col-dense items-center justify-items-end gap-1"
                >
                  <Text
                    as="p"
                    weight="bold"
                    className="justify-self-start uppercase"
                  >
                    <span className="text-brand-400">#</span>
                    <span>{invoice?.slug}</span>
                  </Text>

                  <Text
                    as="p"
                    variant="primary"
                    aria-live="polite"
                    className="justify-self-start"
                  >
                    <span>Due</span>{" "}
                    <time
                      dateTime={new Date(invoice?.paymentDue).toISOString()}
                    >
                      {format(new Date(invoice?.paymentDue), "dd MMM yyyy")}
                    </time>
                  </Text>

                  <Text as="p" variant="accent" className="">
                    {invoice?.clientName}
                  </Text>

                  <Text as="p" size="md" weight="bold" className="">
                    {formatAmount(invoice?.total)}
                  </Text>

                  {/* // className='w-full justify-self-start' */}
                  <Button
                    type="button"
                    className={tw(
                      "!h-10 !w-[6.5rem] justify-around !px-4 !py-3 capitalize ",
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

                  <div className="">
                    <IconArrowRight />
                  </div>
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
                  <h2>There is nothing here</h2>

                  <p className="max-w-[22rem]">
                    Create an invoice by clicking the&nbsp;
                    <em className="font-bold">New Invoice</em> button and get
                    started
                  </p>
                </div>
              </article>
            </li>
          }
        </ul>
      </section>
    </div>
  );
}
