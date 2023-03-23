import { icons } from "common";
import { InvoiceDetails, InvoiceDetailsMobile } from "components/organisms";
import { useInvoice } from "context";
import Link from "next/link";

type Props = {};

const InvoiceTemplate = (props: Props) => {
  const invoice = useInvoice();

  return (
    <section className='h-container '>
      <Link href='/invoices'>
        <a className='body-100 mt-20 flex items-center gap-8 font-bold'>
          <span>
            <icons.arrow.left />
          </span>
          <span>Go back</span>
        </a>
      </Link>

      <InvoiceDetailsMobile invoice={invoice} />
      <InvoiceDetails invoice={invoice} />
    </section>
  );
};

export { InvoiceTemplate };
