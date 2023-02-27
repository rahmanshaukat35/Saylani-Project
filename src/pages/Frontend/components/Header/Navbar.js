import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";
import { motion } from "framer-motion";
import saylani from "../../../../images/saylani.png";
import "../../../../scss/navbar.scss";
import { signOut } from "firebase/auth";
import { auth } from "../../../../config/firebase";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const { isAuthenticated, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch({ type: "LOGOUT" });
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        window.notify("Something went wrong, user not signout", "error");
      });
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-primary navbar-dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img className="image" src={saylani} alt="" />
            <span className="ms-3">Saylani Event-Managment APP</span>
          </Link>
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
          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 ">
              <motion.li whileTap={{ scale: 1.2 }} className="nav-item">
                <Link to="/" className="nav-link ">
                  Home
                </Link>
              </motion.li>
              <motion.li whileTap={{ scale: 1.2 }} className="nav-item">
                <Link to="/about" className="nav-link">
                  About
                </Link>
              </motion.li>
              <motion.li whileTap={{ scale: 1.2 }} className="nav-item">
                <Link to="/events" className="nav-link">
                  Events
                </Link>
              </motion.li>

              <motion.li whileTap={{ scale: 1.2 }} className="nav-item">
                <Link to="/contact" className="nav-link">
                  Contact
                </Link>
              </motion.li>
            </ul>
            <div className="d-flex">
              {!isAuthenticated ? (
                <Link
                  to="/authentication/login"
                  className="btn btn-success text-white"
                >
                  Login
                </Link>
              ) : (
                <>
                  <Link
                    to="/dashboard"
                    className="btn btn-info btn-sm me-2 text-white"
                  >
                    Create Event
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
