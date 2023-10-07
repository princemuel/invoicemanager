import * as React from 'react';
import { BreakpointIndicator } from '../atoms';
import { Sidebar } from '../organisms';

interface BaseLayoutProps {
  children: React.ReactNode;
}

export function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <React.Fragment>
      <Sidebar />
      {children}
      <BreakpointIndicator />
    </React.Fragment>
  );
}
