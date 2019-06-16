import React from "react";
import { IoIosLogOut } from "react-icons/io";
import companyLogo from "../../companyLogo.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="text-dark ">
      {" "}
      <Link to="/" className="text-dark">
        <span className="m-2 p-2">
          {" "}
          <img src={companyLogo} alt="Company Logo" />
        </span>
      </Link>
      <a href="about:blank" className="text-dark">
        <span className="float-right m-2">
          {" "}
          <IoIosLogOut size={28} />{" "}
        </span>
      </a>
    </header>
  );
}

export default Header;
