import { useFetcher } from "react-router";
import { Button } from "./button";

function MarkAsPaid() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="POST">
      <Button
        type="submit"
        aria-label="Mark Invoice as Paid"
        name="status"
        value="paid"
        variant="primary"
      >
        Mark as Paid
      </Button>
    </fetcher.Form>
  );
}

export { MarkAsPaid };
