import React, { useEffect } from "react";
import { useLocation, Navigate, useNavigate, Link } from "react-router-dom";
import HttpService from "../../Services/HttpService";
import { useState } from "react";
import Button from "react-bootstrap/Button";

const Orientation = () => {
  const [userData, setuserdata] = useState({});
  const [persons, setPersons] = useState([]); // for build
  const navigate = useNavigate();

  useEffect(() => {
    HttpService.get(
      process.env.REACT_APP_API_URL + "/application/getuser"
    ).then(
      (response) => {
        setuserdata(response.data);
        console.log(response);
      },
      (error) => {
        alert("OOps!.. Somwthing went wrong");
      }
    );

    HttpService.get(
      process.env.REACT_APP_API_URL + "/orientation/getlist"
    ).then(
      (response) => {
        console.log("from list persons component");
        setPersons(response.data.persons);
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
      {/* //-----------------table starts--------------------- */}
      <div className="container border text-center rounded mt-3">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Sl No.</th>
                <th scope="col">Name</th>
                <th scope="col">Phone No.</th>
                <th scope="col">Gender</th>
                <th scope="col">Role</th>
              </tr>
            </thead>
            <tbody>
              {persons.map((item, indx) => (
                <tr key={indx} data-toggle="modal" data-target="#exampleModal">
                  <th scope="row">{indx + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.phone_no}</td>
                  <td>{item.gender}</td>
                  <td>
                    <span className={item.role ? "userHighliter px-2" : null}>
                      {item.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Orientation;
