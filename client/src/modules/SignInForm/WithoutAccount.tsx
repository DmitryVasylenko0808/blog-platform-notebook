import React from "react";
import { Link } from "react-router-dom";

const WithoutAccount = () => {
  return (
    <p className="mb-6">
      Don't have an account?{" "}
      <Link to="/sign-up" className="mx-1 text-notebook-300">
        Sign Up
      </Link>
    </p>
  );
};

export default WithoutAccount;
