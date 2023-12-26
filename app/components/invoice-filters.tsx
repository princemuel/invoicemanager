import { IconCheck } from "@/common";
import { Form, useSearchParams, useSubmit } from "@remix-run/react";
import { Text } from "./text";

const stats = ["draft", "pending", "paid"];

export function InvoiceFilters() {
  const submit = useSubmit();

  const [searchParams] = useSearchParams();
  const statuses = searchParams.getAll("status");

  return (
    <Form
      method="GET"
      className="flex w-28 flex-col items-start gap-2 rounded-lg bg-white p-3 sm:w-48 sm:gap-4 sm:p-6 dark:bg-brand-600"
      onChange={(e) => submit(e.currentTarget)}
    >
      {stats.map((stat) => (
        <div key={stat} className="flex flex-row-reverse items-center gap-3">
          <Text as="label" htmlFor={stat} weight="bold" className="capitalize">
            {stat}
          </Text>

          <div className="relative size-3.5">
            <input
              type="checkbox"
              id={stat}
              name="status"
              value={stat}
              defaultChecked={statuses.includes(stat)}
              className="peer absolute top-0 size-full cursor-pointer appearance-none rounded-sm border border-brand-400/25 bg-brand-100 checked:bg-brand-500 hover:border-brand-500 dark:bg-brand-700 dark:checked:bg-brand-500"
            />

            <IconCheck className="pointer-events-none absolute left-1/2 top-1/4 hidden -translate-x-1/2 peer-checked:block" />
          </div>
        </div>
      ))}
    </Form>
  );
}
