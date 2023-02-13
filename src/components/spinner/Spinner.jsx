import React from "react";
import { TailSpin } from "react-loader-spinner";
import "./spinner.css";

const Spinner = (params) => {
  // return (
  //   <div className={params.active ? "spinnerContainer active": "spinnerContainer"}>
  //        <TailSpin
  //           height="100"
  //           width="100"
  //           color="#4fa94d"
  //           ariaLabel="tail-spin-loading"
  //           radius="1"
  //           wrapperStyle={{}}
  //           wrapperClass=""
  //           visible={true}
  //         />
  // </div>
  // )
  return (
    <>
      <div className="container emp-profile">
        <form method="">
          <div className="row">
            <div className="col-md-4">
              <div className="profile-img">
                <img src="user.png" alt="Hospital Img" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="profile-head">
                <h5>Hospital Name</h5>
                <h6>Address</h6>
                <p className="profile-rating mt-3 mb-5">
                  Ranking: <span>1/10</span>
                </p>

                <ul className="nav nav-tabs" rol="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="home-tab"
                      data-toggle="tab"
                      href="#home"
                      role="tab"
                    >
                      Active
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link "
                      id="profile-tab"
                      data-toggle="tab"
                      href="#"
                      role="tab"
                    >
                      Link
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-2">
              <input
                type="text"
                className="profile-edit-btn"
                name="btnAddMore"
                value="Edit Profile"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 ">
              <div className="profile-work">
                <p>Work Link</p>
                <a href="">Website</a>
                <a href="">Social Media</a>
              </div>
            </div>
            <div className="col-md-8 pl-5 about-info">
              <div className="tab-content profile-tab" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-lavelledby="hame-tab"
                ></div>
                <div className="row">
                  <div className="col-md-6">
                    <label>User ID</label>
                  </div>
                  <div className="col-md-6">
                    <p>7598721498549857</p>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <label>Name</label>
                  </div>
                  <div className="col-md-6">
                    <p>Hospital Name</p>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <label>Email</label>
                  </div>
                  <div className="col-md-6">
                    <p>hospital@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Spinner;
