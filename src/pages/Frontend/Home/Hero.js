import React from "react";
import "../../../scss/herosection.scss";
import { motion } from "framer-motion";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="d-flex flex-row justify-content-center align-items-center">
      <div className="main-div d-flex flex-column justify-content-center align-items-center text-light">
        <motion.h3 whileHover={{ scale: 1.2 }}>One Stop</motion.h3>
        <motion.h1 whileHover={{ scale: 1.2 }}>Event Planner</motion.h1>
        <motion.p whileHover={{ scale: 1.2 }}>
          Every Event Should Be Perfect!
        </motion.p>
        <div className="row">
          <div className="col-6">
            <Link to="/events">
              <button className="btn">Join Events</button>
            </Link>
          </div>
          <div className="col-6">
            <Link to="/authentication/login">
              <button className="btn">
                Get Started
                <BsFillArrowRightCircleFill className="text-dark fs-4" />
              </button>
            </Link>
          </div>
        </div>
      </div>
      ;
    </div>
  );
}
