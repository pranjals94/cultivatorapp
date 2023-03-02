import React, { useEffect } from "react";
import {useNavigate, Link } from "react-router-dom";
import HttpService from "../../Services/HttpService";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowRight,
  faCircleArrowLeft
} from "@fortawesome/free-solid-svg-icons";
import Sidebar from "./Sidebar";

const Cultivator = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const [viewSideBar, setViewSideBar] = useState(false);

  useEffect(() => {
    HttpService.get("/application/getuser").then(
      (response) => {
        setUserData(response.data);
        console.log(response);
      },
      (error) => {
        // alert("OOps!.. Somwthing went wrong");
      }
    );
  }, []);

  function logout() {
    HttpService.get("/auth/logout").then(
      (response) => {
        navigate("/");
        console.log("log out = ", response);
      },
      (error) => {
        console.log(error);
        alert("OOps!.. Somwthing went wrong");
      }
    );
  }

  const showSidebar = () => {
    setViewSideBar(!viewSideBar);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="d-flex align-items-center">
          {!viewSideBar ? (
            <FontAwesomeIcon
              onClick={showSidebar}
              className="d-lg-none fa-2x border rounded p-2 ml-2"
              icon={faCircleArrowRight}
            />
          ) : (
            <FontAwesomeIcon
              onClick={showSidebar}
              className="d-lg-none fa-2x border rounded p-2 ml-2"
              icon={faCircleArrowLeft}
            />
          )}
          <a className="navbar-brand ml-2" href="#">
            CULTIVATOR
          </a>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to={"/"}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Pricing
              </a>
            </li>
          </ul>
          <span className="navbar-text pr-3">
            Welcome {userData.role}{" "}
            <i style={{ color: "red" }}>{userData.nameOfUser}</i> !
          </span>
          <span className="navbar-text pr-3">
            <Button onClick={logout} variant="primary">
              Logout
            </Button>
          </span>
        </div>
      </nav>
      <div className={!viewSideBar ? "d-none d-lg-block" : ""}>
        <Sidebar />
      </div>
    </>
  );
};

export default Cultivator;
