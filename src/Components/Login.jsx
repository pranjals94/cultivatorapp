import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import pic from "../GEV-Logo.png";
import "../Services/HttpService";
import HttpService from "../Services/HttpService";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const navigate = useNavigate();
  const [login_credentials, setLogin_credentials] = useState({
    username: "",
    password: "",
  });

  const onchangeHandler = (e) => {
    let temp = login_credentials;
    temp[e.target.name] = e.target.value;
    setLogin_credentials(temp);
  };

  //-----------------------------------------------------------------------------------------------------p
  const OnLogIn = () => {
    HttpService.post("/auth/login", login_credentials).then(
      (response) => {
        navigate("/app/userhomepage", {
          state: {
            userRole: response.data.role,
          },
        });
      },
      (error) => {
        alert("Invalid username or password");
      }
    );
  };
  {
    //----------------------------------------------------------------------------------------------------
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}>
        <div className="col-sm-4 border rounded border-secondary mx-auto ">
          <main className="px-3 ">
            <div className="text-center">
              {/* this from context name = {a.userRole} */}
              <img
                style={{ width: "10rem", height: "10rem" }}
                className="card-img-top"
                src={pic}
                alt="Card image cap"
              />
              <h4>
                <b>Log In</b>
              </h4>
            </div>
            <hr></hr>
            <form>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  aria-describedby="username"
                  placeholder="Enter Username"
                  onChange={(e) => onchangeHandler(e)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Password</label>
                <input
                  type="text"
                  className="form-control"
                  id="password"
                  name="password"
                  aria-describedby="password"
                  placeholder="Enter Password"
                  onChange={(e) => onchangeHandler(e)}
                />
              </div>
            </form>
          </main>
          <div className="text-center mt-3">
            <Button onClick={OnLogIn} className="mb-3 " variant="primary">
              Go
            </Button>
          </div>
        </div>
      </div>
    );
  }
};

export default LogIn;
