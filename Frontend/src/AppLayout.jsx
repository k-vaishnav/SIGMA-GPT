import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
export const AppLayout = () => {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};
