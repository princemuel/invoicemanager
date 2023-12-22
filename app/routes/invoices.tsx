import { Sidebar } from "@/components/layout.sidebar";
import { Outlet } from "@remix-run/react";

function LayoutRoute() {
  return (
    <div className="relative flex min-h-screen flex-col bg-white text-brand-900 md:flex-row dark:bg-brand-800 dark:text-white">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default LayoutRoute;
