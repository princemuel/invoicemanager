import { Link } from 'react-router-dom';
import type { IStatus } from '../@types';
import { QueryResult } from '../components';
import { useAuthState } from '../context';
import { useGetInvoicesQuery } from '../hooks';
import { client } from '../lib';

const status: IStatus = ['PAID', 'PENDING', 'DRAFT'];

interface Props {}

const HomeRoute = (props: Props) => {
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
    <div>
      <h1>{`Welcome User with ${user?.email}`}</h1>

      <QueryResult loading={isLoading} error={error} data={data}>
        <ul>
          {invoices?.map((invoice) => {
            return (
              <li key={invoice.id}>
                <div>
                  <p>{invoice.tag}</p>
                  <p>{invoice.status}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </QueryResult>

      <p className='text-600 underline'>
        <Link to='/invoices'>View all Invoices</Link>
      </p>
    </div>
  );
};

export { HomeRoute };
