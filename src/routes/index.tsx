import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<h1>Layout</h1>}>
      <Route index element={<h1>Home</h1>} />

      <Route path="*" element={<h1>Error Page</h1>} />
    </Route>
  )
);
