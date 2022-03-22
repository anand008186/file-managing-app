import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Header() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  //logout functionality
  // const logout = async () => {
  //    await  signOut();
  //   }

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light "
        style={{ backgroundColor: "#37517e" }}
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-4 mt-3 mb-lg-0">
              <li className="nav-item mx-3">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>

              <li className="nav-item mx-3">
                <NavLink className="nav-link" to="/dashboard">
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item ms-3 me-5">
                <NavLink className="nav-link" to="/signIn">
                  Sign In
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
