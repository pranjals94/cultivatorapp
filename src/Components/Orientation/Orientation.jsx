import React, { useEffect } from "react";
import { useLocation, Navigate, useNavigate,Link } from "react-router-dom";
import HttpService from "../../Services/HttpService";
import { useState } from "react";
import Button from "react-bootstrap/Button";

const Orientation = () => {
  const [userData, setuserdata] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    HttpService.get("/application/getuser").then(
      (response) => {
        setuserdata(response.data);
        console.log(response);
      },
      (error) => {
        alert("OOps!.. Somwthing went wrong");
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

  return (
    <>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <b className="navbar-brand pl-3">ORIENTATION</b>
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
                Home <span className="sr-only">(current)</span>
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
      <h2>
        <i style={{ color: "red" }}>{userData.nameOfUser}</i>
      </h2>
      This is ORIENTATION page welcome to the cultivator app
    </>
  );
};

export default Orientation;
