import * as React from 'react';
import { BreakpointIndicator } from '../atoms';
import { Sidebar } from '../organisms';

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      <Sidebar />
      {children}
      <BreakpointIndicator />
    </React.Fragment>
  );
};

export { BaseLayout };
