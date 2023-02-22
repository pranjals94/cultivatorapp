import React, { useEffect, useState } from "react";
import HttpService from "../Services/HttpService";

import AdminPage from "./Admin/AdminPage";
import Cultivator from "./Cultivator/Cultivator";
import Reception from "./Reception/Reception";
import Orientation from "./Orientation/Orientation";

const UserHomepage = (props) => {
  const [userRole, setUserRole] = useState(
    props ? "" : props.userRole.userRole
  ); // emty admin during build

  useEffect(() => {
    HttpService.get("/application/getuser").then(
      (response) => {
        setUserRole(response.data.role);
        console.log(response);
      },
      (error) => {
        // alert("OOps!.. Somwthing went wrong");
      }
    );
  }, []);

  if (userRole === "ADMIN") return <AdminPage />;
  if (userRole === "CULTIVATOR") return <Cultivator />;
  if (userRole === "ORIENTATION") return <Orientation />;
  if (userRole === "RECEPTION") return <Reception />;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
      className="text-center">
      <h3>Loading Please Wait... !</h3>
    </div>
  );
};

export default UserHomepage;
