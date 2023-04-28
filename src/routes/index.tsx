import { Layout } from '@src/components';
import { PersistLogin, RequireAuth } from '@src/middleware';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { LoginRoute, RegisterRoute } from './auth';
import { HomeRoute } from './home';
import {
  EditInvoiceRoute,
  InvoiceRoute,
  InvoicesRoute,
  NewInvoiceRoute,
} from './invoices';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='login' element={<LoginRoute />} />
      <Route path='register' element={<RegisterRoute />} />

      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth />}>
          <Route index element={<HomeRoute />} />

          <Route path='invoices'>
            <Route index element={<InvoicesRoute />} />
            <Route path=':invoiceId' element={<InvoiceRoute />} />

            <Route path=':invoiceId/edit' element={<EditInvoiceRoute />} />
            <Route path='new' element={<NewInvoiceRoute />} />
          </Route>
        </Route>
      </Route>
      <Route path='*' element={<h1>Error Page</h1>} />
    </Route>
  )
);
