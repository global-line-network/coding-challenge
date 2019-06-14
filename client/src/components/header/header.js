import React from "react";
import { FaUsers } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
function Header() {
  return (
    <header className="border border-dark text-white border-top-0 border-left-0 border-right-0">
      {" "}
      <a href="/" className="text-white">
        <span className="m-2 p-2">
          {" "}
          <FaUsers size={42} />{" "}
          <h3 className="d-inline mb-0"> User Management System </h3>
        </span>
      </a>
      <a href="about:blank" className="text-white">
        <span className="float-right m-2">
          {" "}
          <IoIosLogOut size={28} />{" "}
        </span>
      </a>
    </header>
  );
}

export default Header;
