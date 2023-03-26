import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { InvoiceRoute } from './invoice';
import { InvoicesRoute } from './invoices';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<h1>Layout</h1>}>
      <Route index element={<h1>Home</h1>} />

      <Route path='invoices'>
        <Route index element={<InvoicesRoute />} />
        <Route path=':id' element={<InvoiceRoute />} />
      </Route>

      <Route path='*' element={<h1>Error Page</h1>} />
    </Route>
  )
);
