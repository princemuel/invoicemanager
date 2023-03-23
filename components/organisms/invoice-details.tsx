import { StatusButton, Text } from "components/atoms";
import { Invoice } from "hooks";

type Props = {
  invoice: Invoice;
};

const InvoiceDetails = ({ invoice }: Props) => {
  return (
    <article className='mt-10 grid gap-12 max-md:hidden'>
      <header className='flex items-center justify-between rounded-brand bg-neutral-100 py-12 px-10 shadow-100 dark:bg-brand-700'>
        <Text className='body-100 text-[#858BB2] dark:text-brand-100'>
          Status
        </Text>
        <StatusButton status={invoice?.status} className='px-14 py-6' />
      </header>
    </article>
  );
};

export { InvoiceDetails };
