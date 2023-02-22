import React, { useEffect, useState } from "react";
import HttpService from "../../Services/HttpService";
const ListPersons = () => {
  const [persons, setPersons] = useState([]); // for build
  // const [persons, setPersons] = useState([
  //   { id: 1, name: "pranjal", role: "ADMIN" },
  //   { id: 2, name: "Chandan" },
  // ]);
  const [roles, setRoles] = useState([]); // for build
  // const [roles, setRoles] = useState([
  //   { id: 1, name: "ADMIN" },
  //   { id: 2, name: "Cultivator" },
  //   { id: 3, name: "Orientation" },
  // ]);

  const [modalData, setModalData] = useState({});
  const [modalFormData, setModalFormData] = useState({
    person_id: "",
    username: "",
    password: "",
    role_id: "",
  });

  useEffect(() => {
    HttpService.get("/application/listpersons").then(
      (response) => {
        setPersons(response.data.persons);
      },
      (error) => {
        // alert("OOps!.. Somwthing went wrong");
      }
    );
    HttpService.get("/application/getroles").then(
      (response) => {
        setRoles(response.data.roles);
      },
      (error) => {
        // alert("OOps!.. Somwthing went wrong");
      }
    );
  }, []);

  console.log("persons", persons);

  const onchangeHandler = (e) => {
    let temp = modalFormData;
    temp[e.target.name] = e.target.value;
    setModalFormData(temp);
  };

  const onModelShow = (item) => {
    console.log("item", item);
    let temp = modalFormData;
    if (item.role != null) {
      setModalData(item);
      return;
    }
    temp["person_id"] = item.id;
    setModalFormData(temp);
    setModalData(item);
  };
  const createUserClicked = () => {
    console.log("modalFormData", modalFormData);
    HttpService.post("/application/createuser", modalFormData).then(
      (response) => {
        alert(response.data.msg);
      },
      (error) => {
        // alert("OOps!.. Somwthing went wrong");
      }
    );
  };

  return (
    <>
      <div className="table-responsive">
        <table class="table table-hover">
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
              <tr
                onClick={() => onModelShow(item)}
                data-toggle="modal"
                data-target="#exampleModal"
                className={item.role ? "bg-info" : null}>
                <th scope="row">{indx + 1}</th>
                <td>{item.name}</td>
                <td>{item.phone_no}</td>
                <td>{item.gender}</td>
                <td>{item.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* //------------------------Modal starts------------------------------------ */}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h6 class="modal-title" id="exampleModalLabel">
                [{modalData.id}] {modalData.name}
              </h6>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            {modalData.role ? (
              <div class="modal-body">This Person is Already Registered</div>
            ) : (
              <div class="modal-body">
                <div className="form-group ">
                  <label htmlFor="username"> Create Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Enter a username"
                    name="username"
                    onChange={(e) => onchangeHandler(e)}
                  />
                </div>
                <div className="form-group ">
                  <label htmlFor="password"> Create Password</label>
                  <input
                    type="text"
                    className="form-control"
                    id="password"
                    placeholder="Enter a Password"
                    name="password"
                    onChange={(e) => onchangeHandler(e)}
                  />
                </div>
                {/* //-------------input role--------------------------            */}
                <div className="form-group ">
                  <label htmlFor="role">Select a Role</label>
                  <select
                    id="role"
                    className="form-control"
                    name="role_id"
                    onChange={(e) => onchangeHandler(e)}>
                    {roles.map((item) => (
                      <option value={item.id}>{item.name}</option>
                    ))}
                  </select>
                </div>
                {/* //--------------input role end------------------ */}
              </div>
            )}
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal">
                Close
              </button>
              {modalData.role ? null : (
                <button
                  onClick={createUserClicked}
                  type="button"
                  class="btn btn-primary"
                  data-dismiss="modal">
                  Create User
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* //------------------------Modal ends------------------------------------ */}
    </>
  );
};

export default ListPersons;
