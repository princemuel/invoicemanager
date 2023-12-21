import { IconCheck } from "@/common";
import { Form, useSearchParams, useSubmit } from "@remix-run/react";
import { Text } from "./text";

export function InvoiceFilters() {
  const submit = useSubmit();

  const [searchParams] = useSearchParams();
  const statuses = searchParams.getAll("status");

  return (
    <Form
      method="GET"
      className="flex w-28 flex-col items-start gap-2 rounded-lg bg-white p-3 dark:bg-brand-600 sm:w-48 sm:gap-4 sm:p-6"
      onChange={(e) => submit(e.currentTarget)}
    >
      <div className="flex flex-row-reverse items-center gap-3">
        <Text as="label" htmlFor="draft" weight="bold">
          Draft
        </Text>

        <div className="size-3.5 relative">
          <input
            type="checkbox"
            id="draft"
            name="status"
            value="draft"
            defaultChecked={statuses.includes("draft")}
            className="size-full peer absolute top-0 appearance-none rounded-sm border border-brand-400/25 bg-brand-100 checked:bg-brand-500 hover:border-brand-500 dark:bg-brand-700 dark:checked:bg-brand-500"
          />

          <IconCheck className="pointer-events-none absolute left-1/2 top-1/4 hidden -translate-x-1/2 peer-checked:block" />
        </div>
      </div>

      <div className="flex flex-row-reverse items-center gap-3">
        <Text as="label" htmlFor="pending" weight="bold">
          Pending
        </Text>

        <div className="size-3.5 relative">
          <input
            type="checkbox"
            id="pending"
            name="status"
            value="pending"
            defaultChecked={statuses.includes("pending")}
            className="size-full peer absolute top-0 appearance-none rounded-sm border border-brand-400/25 bg-brand-100 checked:bg-brand-500 hover:border-brand-500 dark:bg-brand-700 dark:checked:bg-brand-500"
          />

          <IconCheck className="pointer-events-none absolute left-1/2 top-1/4 hidden -translate-x-1/2 peer-checked:block" />
        </div>
      </div>

      <div className="flex flex-row-reverse items-center gap-3">
        <Text as="label" htmlFor="paid" weight="bold">
          Paid
        </Text>

        <div className="size-3.5 relative">
          <input
            type="checkbox"
            id="paid"
            name="status"
            value="paid"
            defaultChecked={statuses.includes("paid")}
            className="size-full peer absolute top-0 appearance-none rounded-sm border border-brand-400/25 bg-brand-100 checked:bg-brand-500 hover:border-brand-500 dark:bg-brand-700 dark:checked:bg-brand-500"
          />

          <IconCheck className="pointer-events-none absolute left-1/2 top-1/4 hidden -translate-x-1/2 peer-checked:block" />
        </div>
      </div>
    </Form>
  );
}
