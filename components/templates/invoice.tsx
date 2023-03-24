import { InvoiceDetails, InvoiceDetailsMobile } from "components/organisms";
import { useInvoice } from "context";
import * as React from "react";

type Props = {};

const InvoiceTemplate = (props: Props) => {
  const invoice = useInvoice();

  return (
    <React.Fragment>
      <InvoiceDetailsMobile invoice={invoice} />
      <InvoiceDetails invoice={invoice} />
    </React.Fragment>
  );
};

export { InvoiceTemplate };
