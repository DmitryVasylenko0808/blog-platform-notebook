import React from "react";
import { Link } from "react-router-dom";

const HaveAccount = () => {
  return (
    <div className="mb-6">
      Already have an account?{" "}
      <Link to="/sign-in" className="mx-1 text-notebook-300">
        Sign In
      </Link>
    </div>
  );
};

export default HaveAccount;
