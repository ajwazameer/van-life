import { Outlet } from "react-router-dom";
export default function Dashboard() {
  return (
    <>
      <h1>This is host dashboard</h1>
      <Outlet />
    </>
  );
}
