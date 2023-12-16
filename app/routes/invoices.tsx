import { Sidebar } from "@/components/layout.sidebar";
import { Outlet } from "@remix-run/react";

type Props = {};

function LayoutRoute(props: Props) {
  return (
    <div className="relative flex min-h-full flex-col bg-white text-brand-900 dark:bg-brand-800 dark:text-white md:flex-row">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default LayoutRoute;