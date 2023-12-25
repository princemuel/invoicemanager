import { calculateTotal, formatAmount, hasValues, tw } from "@/helpers/utils";
import type { loader } from "@/routes/invoices.$slug";
import { Link, useLoaderData } from "@remix-run/react";
import { format } from "date-fns";
import { Button } from "./button";
import { Text } from "./text";

type Props = { className?: string };

export function InvoiceDesktop({ className }: Props) {
  const data = useLoaderData<typeof loader>();
  const invoice = data.invoice;
  return (
    <section className={className}>
      <header className="container">
        <div className="flex items-center gap-5 rounded-lg bg-white px-8 py-5 shadow-100 dark:bg-brand-700">
          <Text as="p" variant="accent">
            Status
          </Text>

          <Button
            type="button"
            className={tw(
              "!h-10 !w-[6.5rem] justify-around !px-4 !py-3 capitalize",
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

          <div className="ml-auto flex items-center justify-between gap-2">
            <Button variant="soft" asChild>
              <Link to="edit">Edit</Link>
            </Button>
            <Button variant="destructive" asChild>
              <Link to="delete">Delete</Link>
            </Button>
            <Button variant="primary" asChild>
              <Link to="mark-as-paid">Mark as Paid</Link>
            </Button>
          </div>
        </div>
      </header>

      <article className="pb-20 container">
        <div className="flex flex-col gap-12 rounded-lg bg-white px-8 py-8 shadow-100 dark:bg-brand-700">
          <div className="flex justify-between gap-7">
            <div className="> * + * space-y-3">
              <Text as="p" weight="bold" className="text-base uppercase">
                <span className="text-brand-400">#</span>
                <span>{invoice.slug}</span>
              </Text>

              <Text as="h1" id="page-heading" variant="primary">
                {invoice.description}
              </Text>
            </div>

            <address>
              <Text as="p" variant="primary" size="xs">
                {invoice?.senderAddress?.street}
              </Text>
              <Text as="p" variant="primary" size="xs">
                {invoice?.senderAddress?.city}
              </Text>
              <Text as="p" variant="primary" size="xs">
                {invoice?.senderAddress?.postCode}
              </Text>
              <Text as="p" variant="primary" size="xs">
                {invoice?.senderAddress?.country}
              </Text>
            </address>
          </div>

          {/* gap-x-14 */}
          <div className="flex justify-between gap-x-[clamp(3rem,10vw,5rem)] gap-y-10 max-md:flex-wrap">
            <div className="flex flex-initial flex-col gap-7">
              <div className="> * + * space-y-3">
                <Text as="p" variant="primary">
                  Invoice Date
                </Text>

                <Text
                  as="time"
                  dateTime={new Date(invoice?.issued).toISOString()}
                  size="sm"
                  className="inline-block"
                >
                  {format(new Date(invoice?.issued), "dd MMM yyyy")}
                </Text>
              </div>

              <div className="> * + * space-y-3">
                <Text as="p" variant="primary">
                  Payment Due
                </Text>

                <Text
                  as="time"
                  dateTime={new Date(invoice?.paymentDue).toISOString()}
                  size="sm"
                  className="inline-block"
                >
                  {format(new Date(invoice?.paymentDue), "dd MMM yyyy")}
                </Text>
              </div>
            </div>

            <div className="mr-auto flex flex-initial flex-col gap-5">
              <div className="> * + * space-y-3">
                <Text as="p" variant="primary">
                  Bill To
                </Text>
                <Text size="sm" className="truncate">
                  {invoice?.clientName}
                </Text>
              </div>

              <address>
                <Text as="p" variant="primary" size="xs">
                  {invoice?.clientAddress?.street}
                </Text>
                <Text as="p" variant="primary" size="xs">
                  {invoice?.clientAddress?.city}
                </Text>
                <Text as="p" variant="primary" size="xs">
                  {invoice?.clientAddress?.postCode}
                </Text>
                <Text as="p" variant="primary" size="xs">
                  {invoice?.clientAddress?.country}
                </Text>
              </address>
            </div>

            <div className="> * + * flex-1 space-y-3">
              <Text as="p" variant="primary">
                Sent to
              </Text>
              <Text size="sm" className="truncate">
                {invoice?.clientEmail}
              </Text>
            </div>
          </div>
          <table className="grid grid-cols-1 overflow-clip rounded-lg bg-neutral-200 dark:bg-brand-600">
            <caption className="sr-only">Items and Services Purchased</caption>

            <thead className="px-8 py-5">
              <tr className="grid grid-cols-4 justify-items-end">
                <Text
                  as="th"
                  variant="primary"
                  size="xs"
                  className="justify-self-start"
                >
                  Item Name
                </Text>
                <Text as="th" variant="primary" size="xs" className="">
                  QTY.
                </Text>
                <Text as="th" variant="primary" size="xs" className="">
                  Price
                </Text>
                <Text as="th" variant="primary" size="xs" className="">
                  Total
                </Text>
              </tr>
            </thead>

            <tbody className="flex flex-col gap-8 px-8 py-5">
              {hasValues(invoice?.items || []) ?
                invoice.items.map((item) => (
                  <tr
                    key={item?.id}
                    className="grid grid-cols-4 justify-items-end gap-2"
                  >
                    <Text as="td" weight="bold" className="justify-self-start">
                      {item?.name}
                    </Text>

                    <Text as="td" weight="bold">
                      {item?.quantity}
                    </Text>

                    <Text as="td" variant="secondary" weight="bold">
                      {formatAmount(item?.price)}
                    </Text>
                    <Text as="td" variant="secondary" weight="bold">
                      {formatAmount(item?.total)}
                    </Text>
                  </tr>
                ))
              : <tr className="grid grid-cols-4 justify-items-end gap-2">
                  <Text as="td" weight="bold">
                    No items to show
                  </Text>
                </tr>
              }
            </tbody>

            <tfoot className="bg-accent-300 px-8 py-5 dark:bg-brand-900">
              <tr className="flex items-center justify-between">
                <Text as="th" className="text-white">
                  Amount Due
                </Text>
                <Text
                  as="td"
                  modifier="inverted"
                  weight="bold"
                  className="text-2xl leading-8 -tracking-[0.5px]"
                >
                  {formatAmount(calculateTotal(invoice.items, "total"))}
                </Text>
              </tr>
            </tfoot>
          </table>
        </div>
      </article>
    </section>
  );
}
