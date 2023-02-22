import React, { useEffect } from "react";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import HttpService from "../../Services/HttpService";
import { useState } from "react";
import Button from "react-bootstrap/Button";

const Orientation = () => {
  const [userdata, setuserdata] = useState({});
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
      <Button onClick={logout} className="mb-3 " variant="primary">
        Logout
      </Button>
      <h2>
        <i style={{ color: "red" }}>{userdata.nameOfUser}</i> !
      </h2>
      This is ORIENTATION page welcome to the cultivator app
    </>
  );
};

export default Orientation;
