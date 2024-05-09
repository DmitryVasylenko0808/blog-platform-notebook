import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { MdOutlineLogin, MdOutlineLogout } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import Container from "./Container";

const Header = () => {
  const { isAuthenticated, user, logOut } = useAuth();

  return (
    <header className="pt-6 pb-5 bg-notebook-200">
      <Container>
        <div className="flex justify-between items-center">
          <Link to="/">
            <Logo />
          </Link>
          <div className="flex justify-center items-center gap-8">
            <SearchBar />
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link to="/create-post" className="mx-4">
                  <BsPencilSquare size={20} />
                </Link>
                <Link
                  to={`/profile/${user?.id}`}
                  className="text-notebook-300 font-medium"
                >
                  {user?.login}
                </Link>
                <button
                  className="text-notebook-300 font-medium"
                  aria-label="log out"
                  onClick={logOut}
                >
                  <MdOutlineLogout size={28} />
                </button>
              </div>
            ) : (
              <Link className="text-notebook-300" to="/sign-in">
                <MdOutlineLogin size={28} />
              </Link>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
