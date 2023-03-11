import React, { useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import HttpService from "../../Services/HttpService";
import UploadExcelFile from "./UploadExcelFile";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import pic from "./user.jpg";
import axios from "axios";
import { CultivatorAppContext } from "../../context/CultivatorAppContext";
import Modal from "react-bootstrap/Modal";
import Paginate from "../Common/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Reception = () => {
  // let width = window.innerWidth;
  const [reload, setReload] = useState(false); //use effect dependency on state change
  const [activeCultivatorINDX, setActiveCultivatorINDX] = useState(null);
  const [checkedItems, setCheckedItems] = useState([]);
  const a = useContext(CultivatorAppContext);
  const [activeCultivator, setActiveCultivator] = useState({
    id: null,
    name: "",
  });

  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [guests, setGuests] = useState([]);
  const [cultivators, setCultivators] = useState([]);

  // const fullscreen_values = [true, "sm-down", "md-down", "lg-down", "xl-down", "xxl-down"];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  const paginationClicked = (currentPage) => refreshList(currentPage);
  const refreshList = (currentPage) => {
    axios
      .get(
        process.env.REACT_APP_API_URL +
          "/reception/getguests?currentPage=" +
          currentPage.toString() +
          "&pageSize=10"
      )
      .then((response) => {
        let { totalGuests, guests } = response.data;
        setTotalCount(totalGuests);
        setGuests(guests);
        setCurrentPage(currentPage);
      });
  };

  function handleModalShow() {
    setFullscreen("sm-down");
    setShow(true);
  }

  const navigate = useNavigate();

  useEffect(() => {
    console.log("use effect ran reception.jsx");
    HttpService.get(
      process.env.REACT_APP_API_URL + "/reception/getcultivators"
    ).then(
      (response) => {
        setCultivators(response.data.cultivators);
        console.log(response);
      },
      (error) => {
        // alert("OOps!.. Somwthing went wrong");
      }
    );

    HttpService.get(
      process.env.REACT_APP_API_URL +
        "/reception/getguests?currentPage=1&pageSize=10"
    ).then(
      (response) => {
        setGuests(response.data.guests);
        setTotalCount(response.data.totalGuests);
      },
      (error) => {
        // alert("OOps!.. Somwthing went wrong");
      }
    );
  }, [reload]);

  function selectHandle(e) {
    const { value, name, checked } = e.target;
    let temp;
    if (name === "isAllSelected") {
      temp = guests.map((item) => {
        return { ...item, isChecked: checked };
      });
    } else {
      temp = guests.map((item) =>
        item.id == value ? { ...item, isChecked: checked } : item
      );
    }
    console.log("temp", temp);
    let temp1 = [];
    temp.map((item) => {
      if (item?.isChecked) {
        temp1.push(item.id);
      }
    });
    setCheckedItems(temp1);
    setGuests(temp);
  }

  function logout() {
    HttpService.get(process.env.REACT_APP_API_URL + "/auth/logout").then(
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

  const onAssignButtonClicked = () => {
    if (!activeCultivator.id) {
      alert("No Cultivator Selected");
      return;
    }
    if (!checkedItems.length) {
      alert("please select person(s)");
      return;
    }
    // console.log("Assign Button clicked");

    HttpService.post("/reception/assign-persons-to-cultivator", {
      cultivator: activeCultivator,
      persons: checkedItems,
    }).then(
      (response) => {
        setReload(!reload); //just change state to trigger useEffect
        alert("Cultivator Assigned to Persons.");
        // console.log("assign cultivator to person response", response.data);
      },
      (error) => {
        // alert("OOps!.. Somwthing went wrong");
      }
    );
  };

  // console.log("active cultivator out", activeCultivator);
  // console.log("Checked ITEMS", checkedItems);

  const setCultivator = (indx, name, id) => {
    var temp = activeCultivator;
    temp["id"] = id;
    temp["name"] = name;
    setActiveCultivator(temp);
    setActiveCultivatorINDX(indx);
  };

  return (
    <>
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Excel File. (.xlsx)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UploadExcelFile />
        </Modal.Body>
      </Modal>
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
            Welcome {a.user.role}{" "}
            <i style={{ color: "red" }}>{a.user.nameOfUser}</i> !
          </span>
          <span className="navbar-text mr-3">
            <Button onClick={logout} variant="primary">
              Logout
            </Button>
          </span>
        </div>
      </nav>
      {/* //-------------------------------------------nav bar ends--------------------------------- */}
      {/* //-----------------search bar starts------------------------ */}
      <div className="container" style={{ marginTop: "90px" }}>
        <div
          className="row px-2 py-2 border rounded"
          style={{ backgroundColor: "lightgrey" }}>
          <div
            className="btn-toolbar justify-content-between"
            role="toolbar"
            aria-label="Toolbar with button groups">
            <div className="btn-group" role="group" aria-label="First group">
              <button
                onClick={handleModalShow}
                type="button"
                className="btn btn-outline-secondary">
                Import from Excel
              </button>
              <button type="button" className="btn btn-outline-secondary">
                Test
              </button>
              <div className="btn-group" role="group">
                <button
                  type="button"
                  className="btn btn-outline-primary dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false">
                  Actions
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Dropdown link
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Dropdown link
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                aria-label="Input group example"
                aria-describedby="btnGroupAddon2"
              />
              <div className="input-group-text" id="btnGroupAddon2">
                <FontAwesomeIcon
                  // onClick={showSidebar}
                  className="fa-1x"
                  icon={faSearch}
                />
              </div>
            </div>
          </div>
        </div>
        {/* //--------------------------------------------------------------------------------------- */}
        <div className="row pt-3">
          <div className="col-md-6">
            <div className="container border rounded pb-3">
              <div className="row">
                {cultivators.map((item, indx) => (
                  <div
                    key={indx}
                    onClick={() => setCultivator(indx, item.name, item.id)}
                    className="col-6 col-sm-4 col-md-6 col-lg-4 col-xl-3 pt-3">
                    <div className="card text-center ">
                      <div
                        className={`card-body bg-cardbody hovr ${
                          activeCultivatorINDX === indx
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
            <Paginate
              totalRecords={totalCount}
              paginateClicked={paginationClicked}
              currentPage={currentPage}
              pageSize={pageSize}
              setActivePage={setCurrentPage}
            />
            {guests.length ? (
              <div className="container border rounded">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="gridCheck"
                            name="isAllSelected"
                            checked={
                              guests.filter((item) => item?.isChecked !== true)
                                .length < 1
                            }
                            onChange={(e) => selectHandle(e)}
                          />
                          Sl No.
                        </th>
                        <th scope="col">Name</th>
                        <th scope="col">Phone No.</th>
                        <th scope="col">Email</th>
                        <th scope="col">Gender</th>
                      </tr>
                    </thead>
                    <tbody>
                      {guests.map((item, indx) => (
                        <tr key={indx}>
                          <th scope="row">
                            <div className="form-group">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="gridCheck"
                                  checked={item?.isChecked || false}
                                  name={item.name}
                                  value={item.id}
                                  onChange={(e) => selectHandle(e)}
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
                <input
                  type="checkbox"
                  id="gridCheck"
                  name="isAllSelected"
                  checked={
                    guests.filter((item) => item?.isChecked !== true).length < 1
                  }
                  onChange={(e) => selectHandle(e)}
                />
                Select All.
                <Button onClick={onAssignButtonClicked}>Assign</Button>
                <br />
              </div>
            ) : (
              <b>No New persons found</b>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Reception;
