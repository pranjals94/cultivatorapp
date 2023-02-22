import React, { useEffect, useState } from "react";
import HttpService from "../../Services/HttpService";
const ListUsers = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    HttpService.get("/application/listusers").then(
      (response) => {
        setUsers(response.data.users);
        console.log(response);
      },
      (error) => {
        // alert("OOps!.. Somwthing went wrong");
      }
    );
  }, []);
  return (
    <>
      <div className="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Sl No.</th>
              <th scope="col">Username</th>
              <th scope="col">Role</th>
              <th scope="col">Name</th>
              <th scope="col">Phone No.</th>
              <th scope="col">Gender</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, indx) => (
              <tr>
                <th scope="row">{indx + 1}</th>
                <td>{item.username}</td>
                <td>{item.role}</td>
                <td>{item.name}</td>
                <td>{item.phone_no}</td>
                <td>{item.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListUsers;
