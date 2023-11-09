'use client';

import * as React from 'react';

interface DefaultUserSession {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  image: string | null;
}

const SessionContext = React.createContext<DefaultUserSession | null>(null);

export function useSession() {
  const context = React.useContext(SessionContext);
  if (context == null)
    throw new Error('useSession must be used in a SessionProvider');

  return context;
}

type Props = {
  children: React.ReactNode;
  session: DefaultUserSession;
};

const SessionProvider = ({ children, session }: Props) => {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
