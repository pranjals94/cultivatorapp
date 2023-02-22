import React, { Component } from "react";
import pic from "../GEV-Logo.png";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

const CultivatorHomePage = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}>
      <div
        style={{
          backgroundImage: `url(${require("../Radha-Madanmohan-Temple.jpg")})`,
          height: "75vh",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
        className="col-sm-4 border rounded border-secondary mx-auto text-center pt-2 ">
        <h5>GEV Cultivator App</h5>
        <div style={{ position: "absolute", bottom: "0px" }}>
          <Button
            onClick={() => navigate("/app/login")}
            className="mb-3 "
            variant="primary">
            Log In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CultivatorHomePage;
