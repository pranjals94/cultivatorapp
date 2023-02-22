import React, { useEffect } from "react";
import { useLocation, Navigate, useNavigate, Link } from "react-router-dom";
import HttpService from "../../Services/HttpService";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import ListUsers from "./ListUsers";
import ListPersons from "./ListPersons";

const AdminPage = () => {
  const [userData, setUserData] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    phone_no: "",
    gender: "",
    email: "",
  });
  const navigate = useNavigate();

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
        alert("aOOps!.. Somwthing went wrong");
      }
    );
  }

  const onchangeHandler = (e) => {
    let temp = formData;
    temp[e.target.name] = e.target.value;
    setFormData(temp);
  };

  const onSubmit = () => {
    console.log("form data", formData);
    HttpService.post("/application/createperson", formData).then(
      (response) => {
        console.log(response);
        alert(response.data.msg);
      },
      (error) => {
        console.log(error);
        alert(error.response.data.detail);
      }
    );
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <b className="navbar-brand pl-3">ADMINISTRATOR</b>
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
      {/* //----------------------------Tabs start----------------------- */}
      <div className="container border text-center rounded mt-3">
        <ul className="nav nav-pills pt-3" id="myTab" role="tablist">
          <li className="nav-item">
            <a
              className="nav-link active"
              id="add-new-person-tab"
              data-toggle="tab"
              href="#add-new-person"
              role="tab"
              aria-controls="add-new-person"
              aria-selected="true">
              Add New Person
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="list-users-tab"
              data-toggle="tab"
              href="#list-users"
              role="tab"
              aria-controls="list-users"
              aria-selected="false">
              List Users
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="list-cultivators-tab"
              data-toggle="tab"
              href="#list-cultivators"
              role="tab"
              aria-controls="list-cultivators"
              aria-selected="false">
              List Cultivators
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="list-persons-tab"
              data-toggle="tab"
              href="#list-persons"
              role="tab"
              aria-controls="list-persons"
              aria-selected="false">
              List Persons
            </a>
          </li>
        </ul>
        <hr />
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="add-new-person"
            role="tabpanel"
            aria-labelledby="add-new-person-tab">
            {/* //----------------------------Tabs end----------------------- */}
            {/* //------------------Add new person from starts------------------------- */}
            <form>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="fullname">Full name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullname"
                    placeholder="Enter Full Name"
                    name="name"
                    onChange={(e) => onchangeHandler(e)}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="phonenumber">Phone Number</label>
                  <input
                    type="number"
                    className="form-control"
                    id="phonenumber"
                    placeholder="Enter Mobile No."
                    name="phone_no"
                    onChange={(e) => onchangeHandler(e)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="eg: harekrishna@xyz.com"
                  name="email"
                  onChange={(e) => onchangeHandler(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <input
                  type="text"
                  className="form-control"
                  id="gender"
                  placeholder="Gender"
                  name="gender"
                  onChange={(e) => onchangeHandler(e)}
                />
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputCity">City</label>
                  <input type="text" className="form-control" id="inputCity" />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="inputState">State</label>
                  <select id="inputState" className="form-control">
                    <option selected>Choose...</option>
                    <option>...</option>
                  </select>
                </div>
                <div className="form-group col-md-2">
                  <label htmlFor="inputZip">Zip</label>
                  <input type="text" className="form-control" id="inputZip" />
                </div>
              </div>
              <div className="form-group">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="gridCheck"
                  />
                  <label className="form-check-label" htmlFor="gridCheck">
                    Check me out
                  </label>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onSubmit();
                }}
                className="btn btn-primary">
                Submit
              </button>
            </form>
            {/* //-------------------------Addnew person form ends----------------- */}
          </div>
          <div
            className="tab-pane fade"
            id="list-users"
            role="tabpanel"
            aria-labelledby="list-users-tab">
            <ListUsers />
          </div>
          <div
            className="tab-pane fade"
            id="list-cultivators"
            role="tabpanel"
            aria-labelledby="list-cultivators-tab">
            List Cultivators
          </div>
          <div
            className="tab-pane fade"
            id="list-persons"
            role="tabpanel"
            aria-labelledby="list-persons-tab">
            <ListPersons />
          </div>
        </div>
      </div>
      {/* //----------------------------Tabs----------------------- */}
    </>
  );
};

export default AdminPage;
