import React from "react";
import { Outlet } from "react-router";
import Header from "../components/Header";

const BasicLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default BasicLayout;
