import { Form, useSearchParams, useSubmit } from "@remix-run/react";

export function InvoiceFilters() {
  const submit = useSubmit();

  const [searchParams] = useSearchParams();
  const statuses = searchParams.getAll("status");

  return (
    <Form method="GET" onChange={(e) => submit(e.currentTarget)}>
      <div className="flex flex-row-reverse items-center gap-2">
        <label htmlFor="draft">Draft</label>
        <input
          type="checkbox"
          id="draft"
          name="status"
          value="draft"
          defaultChecked={statuses.includes("draft")}
        />
      </div>

      <div className="flex flex-row-reverse items-center gap-2">
        <label htmlFor="pending">Pending</label>
        <input
          type="checkbox"
          id="pending"
          name="status"
          value="pending"
          defaultChecked={statuses.includes("pending")}
        />
      </div>

      <div className="flex flex-row-reverse items-center gap-2">
        <label htmlFor="paid">Paid</label>
        <input
          type="checkbox"
          id="paid"
          name="status"
          value="paid"
          defaultChecked={statuses.includes("paid")}
        />
      </div>
    </Form>
  );
}
