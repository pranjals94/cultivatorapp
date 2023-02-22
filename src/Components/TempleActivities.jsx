import React, { Component } from "react";
const TempleActivities = () => {
  return (
    <>
      <div className="row justify-content-md-center my-5">
        <div>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a className="nav-link " href="/visitorlist">
                Visitor List
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="/templeactivities">
                Temple Activities
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/visitorevents">
                Visitor Events
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/addvisitor">
                Add Visitor
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* //-------------------------------------------------------------------- */}
      <div className="row justify-content-md-center mx-5 my-5">
        <div className=" col-lg-8 card-deck" >
          <div className="card">
            <img
              className="card-img-top"
              src="https://i.etsystatic.com/19303880/r/il/d12d31/2488085957/il_794xN.2488085957_b2xh.jpg"
              alt="Card image cap"
            />
            <div className="card-body">
              <h5 className="card-title">Janmastami</h5>
              <p className="card-text">DD/MM/YY</p>
            </div>
            <div className="card-footer">
              <small className="text-muted">Last updated Today</small>
            </div>
          </div>
          <div className="card">
            <img
              className="card-img-top"
              src="https://i.etsystatic.com/19303880/r/il/d12d31/2488085957/il_794xN.2488085957_b2xh.jpg"
              alt="Card image cap"
            />
            <div className="card-body">
              <h5 className="card-title">Janmastami</h5>
              <p className="card-text">DD/MM/YY</p>
            </div>
            <div className="card-footer">
              <small className="text-muted">Last updated Yesterday</small>
            </div>
          </div>

          <div className="card">
            <img
              className="card-img-top"
              src="https://i.etsystatic.com/19303880/r/il/d12d31/2488085957/il_794xN.2488085957_b2xh.jpg"
              alt="Card image cap"
            />
            <div className="card-body">
              <h5 className="card-title">Rath Yatra</h5>
              <p className="card-text">DD/MM/YY</p>
            </div>
            <div className="card-footer">
              <small className="text-muted">Last updated DD-MM-YY</small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TempleActivities;
