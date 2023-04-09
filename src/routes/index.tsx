import { Layout } from '@src/components';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { LoginRoute, RegisterRoute } from './auth';
import { CreateInvoiceRoute, InvoiceRoute, InvoicesRoute } from './invoices';
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
        <Route path=':id' element={<InvoiceRoute />} />
        <Route path='create' element={<CreateInvoiceRoute />} />
        <Route path='edit' element={<InvoiceRoute />} />
      </Route>

      <Route path='*' element={<h1>Error Page</h1>} />
    </Route>
  )
);
