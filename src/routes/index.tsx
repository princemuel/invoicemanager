import { Layout } from '@src/components';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { LoginRoute, RegisterRoute } from './auth';
import {
  EditInvoiceRoute,
  InvoiceRoute,
  InvoicesRoute,
  NewInvoiceRoute,
} from './invoices';
import { PublicRoute } from './public';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<PublicRoute />} />
      {/* public routes */}
      <Route path='login' element={<LoginRoute />} />
      <Route path='register' element={<RegisterRoute />} />

      <Route path='invoices'>
        <Route index element={<InvoicesRoute />} />
        <Route path=':invoiceId' element={<InvoiceRoute />} />

        <Route path=':invoiceId/edit' element={<EditInvoiceRoute />} />
        <Route path='new' element={<NewInvoiceRoute />} />
      </Route>

      <Route path='*' element={<h1>Error Page</h1>} />
    </Route>
  )
);
