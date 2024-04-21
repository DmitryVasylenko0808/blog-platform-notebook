import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import ThemeSwitcher from "./ThemeSwitcher";
import { MdOutlineLogin } from "react-icons/md";
import Container from "./Container";

const Header = () => {
  return (
    <header className="pt-6 pb-5 bg-notebook-200">
      <Container>
        <div className="flex justify-between items-center">
          <Link to="/">
            <Logo />
          </Link>
          <div className="flex justify-center items-center gap-8">
            <SearchBar />
            <ThemeSwitcher />
            <button className="text-notebook-300" aria-label="login">
              <MdOutlineLogin size={28} />
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
