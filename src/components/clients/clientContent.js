import React from "react";
import "./client.css";
import faker from "faker";
const ClientContent = props => {
  const { client } = props.client;

  return (
    <div>
      <div className="container content">
        <div className="row profile">
          <div className="col-md-3">
            <div className="profile-sidebar">
              {/* SIDEBAR USERPIC */}
              <div className="profile-userpic">
                <img
                  src={faker.image.avatar()}
                  className="img-responsive"
                  alt=""
                />
              </div>
              {/* END SIDEBAR USERPIC */}
              {/* SIDEBAR USER TITLE */}
              <div className="profile-usertitle">
                <div className="profile-usertitle-name">
                  {client.firstName + " " + client.lastName}
                </div>
                <div className="profile-usertitle-job">
                  {`Total Earnings`}
                  <span className="font-weight-bold text-danger pl-2">
                    &#8377;{parseFloat(client.balance).toFixed(2)}
                  </span>
                </div>
              </div>
              {/* END SIDEBAR USER TITLE */}
              {/* SIDEBAR BUTTONS */}
            </div>
          </div>
          <div className="col-md-9">
            <div className="profile-content">
              {/* END SIDEBAR BUTTONS */}
              {/* SIDEBAR MENU */}
              <div className="profile-usermenu sidebar-sticky">
                <ul className="nav flex-column">
                  <li className="active nav-item">
                    <a href="#" className="nav-link active">
                      <i className="fas fa-envelope-square"></i>
                      {client.email}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="https://codepen.io/jasondavis/pen/jVRwaG?editors=1000"
                    >
                      <i className="fas fa-phone-square-alt"></i>
                      {client.phone}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" target="_blank">
                      <i className="fas fa-tags"></i>
                      &#8377;{parseFloat(client.balance).toFixed(2)}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      <i className="fa fa-flag" />
                      Help{" "}
                    </a>
                  </li>
                </ul>
              </div>
              {/* END MENU */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientContent;
