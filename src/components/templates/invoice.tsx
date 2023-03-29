import { useInvoiceDetail } from '@src/hooks';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { InvoiceDetails, InvoiceDetailsMobile } from '../organisms';

type Props = {};

const InvoiceTemplate = (props: Props) => {
  const { id } = useParams();
  const { data: invoice } = useInvoiceDetail(id!);

  return (
    <React.Fragment>
      <InvoiceDetailsMobile invoice={invoice} />
      <InvoiceDetails invoice={invoice} />
    </React.Fragment>
  );
};

export { InvoiceTemplate };
