import { Layout } from '@src/components';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { InvoiceRoute } from './invoice';
import { InvoicesRoute } from './invoices';
import { LoginRoute } from './login';
import { PublicRoute } from './public';
import { RegisterRoute } from './register';

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
      </Route>

      <Route path='*' element={<h1>Error Page</h1>} />
    </Route>
  )
);
