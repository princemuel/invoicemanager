import { Layout } from '@src/components';
import { RequireAuth } from '@src/middleware';
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
      {/* public routes */}
      <Route path='login' element={<LoginRoute />} />
      <Route path='register' element={<RegisterRoute />} />

      <Route element={<RequireAuth />}>
        <Route index element={<PublicRoute />} />
        <Route path='invoices'>
          <Route index element={<InvoicesRoute />} />
          <Route path=':invoiceId' element={<InvoiceRoute />} />

          <Route path=':invoiceId/edit' element={<EditInvoiceRoute />} />
          <Route path='new' element={<NewInvoiceRoute />} />
        </Route>
      </Route>

      <Route path='*' element={<h1>Error Page</h1>} />
    </Route>
  )
);
