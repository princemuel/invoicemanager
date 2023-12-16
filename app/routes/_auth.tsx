import { Outlet } from "@remix-run/react";

type Props = {};

function LayoutRoute(props: Props) {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <Outlet />
    </main>
  );
}

export default LayoutRoute;
