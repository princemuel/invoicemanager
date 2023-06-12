'use client';

import { useState } from 'react';

interface Props {}

const LogoutButton = (props: Props) => {
  const [shouldLogout, setShouldLogout] = useState(false);

  return (
    <button
      type='button'
      onClick={() => {
        setShouldLogout(true);
      }}
    >
      Logout
    </button>
  );
};

export { LogoutButton };
