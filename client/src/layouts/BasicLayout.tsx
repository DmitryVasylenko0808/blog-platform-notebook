import React, { Suspense } from "react";
import { Outlet } from "react-router";
import Header from "../components/Header";
import Loading from "../components/Loading";

const BasicLayout = () => {
  return (
    <div>
      <Header />
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default BasicLayout;
