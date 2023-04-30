import { IStatus } from '@src/@types';
import { useAuthState } from '@src/context';
import { datetime } from '@src/helpers';
import { useGetInvoicesQuery } from '@src/hooks';
import { client } from '@src/lib';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Text } from '../atoms';

const status: IStatus = ['PAID', 'PENDING', 'DRAFT'];

interface Props {}

const HomeTemplate = (props: Props) => {
  const auth = useAuthState();
  const user = auth?.user;

  const { data, isLoading, error } = useGetInvoicesQuery(client, {});

  const invoices = (data?.invoices || []).sort((a, b) => {
    return (
      status.indexOf(a.status as IStatus[number]) -
      status.indexOf(b.status as IStatus[number])
    );
  });

  return (
    <React.Fragment>
      <section className=''>
        <header className='mt-10'>
          <Text as='h1' className='text-brand-900 dark:text-neutral-100'>
            Invoices
          </Text>
        </header>

        <section className='h-container'>
          <Text as='h2' className='text-brand-900 dark:text-neutral-100'>
            Invoices
          </Text>
        </section>

        <section className='h-container'>
          <table>
            <thead className='bg-brand-200 p-4'>
              <tr className='grid grid-cols-5 items-center justify-items-start p-4'>
                <th>S/N</th>
                <th>Due Date</th>
                <th>Amount</th>
                <th>Customer</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody className='p-4'>
              {invoices?.slice(0, 5).map((invoice) => {
                return (
                  <tr
                    key={invoice.id}
                    className='body-100 grid grid-cols-5 items-center justify-items-start p-4'
                  >
                    <td className='uppercase'>#{invoice.tag}</td>
                    <td>
                      <time dateTime={invoice?.paymentDue}>
                        {datetime.toDateString(invoice?.paymentDue)}
                      </time>
                    </td>
                    <td>{invoice?.total}</td>
                    <td>{invoice?.clientName}</td>
                    <td>{invoice?.status}</td>
                  </tr>
                );
              })}
            </tbody>

            <tfoot>
              <tr>
                <td>
                  <Link to='/invoices'>View All Invoices</Link>
                </td>
              </tr>
            </tfoot>
          </table>
        </section>
      </section>
    </React.Fragment>
  );
};

export { HomeTemplate };
