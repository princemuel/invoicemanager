import { buildItemCountMsg, tw } from "@/helpers/utils";
import { Text } from "./text";

type Props = { className?: string };

const generateMessage = buildItemCountMsg(
  "There {{ verb }} {{ count }} total invoice(s)",
);
const invoices: any[] = [];

export function InvoicesMobile({ className }: Props) {
  return (
    <div className={tw("", className)}>
      <header className="container">
        <div className="flex items-center">
          <Text as="h1" id="page-heading" size="xl">
            Invoices
          </Text>
        </div>
      </header>
    </div>
  );
}
