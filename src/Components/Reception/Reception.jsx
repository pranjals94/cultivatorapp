import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import HttpService from "../../Services/HttpService";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import pic from "./user.jpg";

const Reception = () => {
  // let width = window.innerWidth;
  const [userData, setUserData] = useState({});
  

  const [activeCultivator, setActiveCultivator] = useState({
    active: null,
    name: "Selected Cultivator",
  });

  // const [guests, setGuests] = useState([]); // build purpose uncomment
    const [guests, setGuests] = useState([
    { id: 1, name: "pranjal", role: "ADMIN" },
    { id: 2, name: "natalia" },
    { id: 3, name: "Franco" },
    { id: 4, name: "Lemord" },
    { id: 5, name: "provius" },
    { id: 6, name: "Lanchot", role:"Cultivator"},
  ]);

  // const [cultivators, setCultivators] = useState([]);
  const [cultivators, setCultivators] = useState([
    { id: 2, name: "Gatotkatcha" },
    { id: 3, name: "Aamon" },
    { id: 4, name: "Kadita" }
  ]);

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

    HttpService.get("/application/getcultivators").then(
      (response) => {
        setCultivators(response.data.cultivators);
        console.log(response);
      },
      (error) => {
        // alert("OOps!.. Somwthing went wrong");
      }
    );

    HttpService.get("/application/getguests").then(
      (response) => {
        setGuests(response.data.guests);
        console.log("guests", response);
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

  console.log("active cultivator out", activeCultivator);

  const setActive = (indx, name) => {
    setActiveCultivator({
      active: indx,
      name: name,
    });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <b className="navbar-brand pl-3">Reception</b>
        <i className="navbar-brand d-lg-none"> {activeCultivator.name}</i>
        {/*hide on screens wider than lg*/}
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
            <li className="nav-item ">
              <Link className="nav-link" to={""}>
                Home{" "}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={""}>
                About{" "}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active">Import From PMS </Link>
            </li>
          </ul>
          <span className="navbar-text mr-3">
            Welcome {userData.role}{" "}
            <i style={{ color: "red" }}>{userData.nameOfUser}</i> !
          </span>
          <span className="navbar-text mr-3">
            <Button onClick={logout} variant="primary">
              Logout
            </Button>
          </span>
        </div>
      </nav>
      {/* //-------------------------------------------nav bar ends--------------------------------- */}
      <div className="container" style={{ marginTop: "70px" }}>
        <div className="row pt-3">
          <div className="col-md-6">
            <div className="container border rounded pb-3">
              <div className="row">
                {cultivators.map((item, indx) => (
                  <div
                    onClick={() => setActive(indx, item.name)}
                    className="col-6 col-sm-4 col-md-6 col-lg-4 col-xl-3 pt-3">
                    <div className="card text-center ">
                      <div
                        className={`card-body bg-cardbody hovr ${
                          activeCultivator.active == indx
                            ? "cultivatorActive"
                            : null
                        }`}>
                        <img src={pic} alt="..." className="img-thumbnail" />
                        <p className="card-text">{item.name}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="container border rounded">
              <div className="table-responsive">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Sl No.</th>
                      <th scope="col">Name</th>
                      <th scope="col">Phone No.</th>
                      <th scope="col">Email</th>
                      <th scope="col">Gender</th>
                    </tr>
                  </thead>
                  <tbody>
                    {guests.map((item, indx) => (
                      <tr>
                        <th scope="row">
                          <div className="form-group">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="gridCheck"
                              />
                              {indx + 1}
                            </div>
                          </div>
                        </th>
                        <td>
                          [{item.id}] {item.name}
                        </td>
                        <td>{item.phone_no}</td>
                        <td>{item.email}</td>
                        <td>{item.gender}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Button>Assign</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reception;
