import { Sidebar } from "@/components/layout.sidebar";
import { Outlet } from "@remix-run/react";

function LayoutRoute() {
  return (
    <div className="relative flex min-h-screen flex-col bg-white text-brand-900 dark:bg-brand-800 dark:text-white md:flex-row">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default LayoutRoute;
