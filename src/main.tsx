import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Providers } from './providers';

if (import.meta.env.MODE === 'production') disableReactDevTools();

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Providers />
  </React.StrictMode>
);
