import { Outlet } from "react-router";

export default function Layout() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center">
      <Outlet />
    </main>
  );
}
