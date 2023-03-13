import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

const Nav = () => {
  const [notifications, setNotifications] = useState(0);
  const logout = () => {
    window.open(`${process.env.REACT_APP_API_URL}/api/auth/logout`, "_self");
  };
  const user = useContext(UserContext);
  const getTotalNotif = async (user) => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/posts/totalnotifications`;
      await axios
        .post(url, { user: user }, { withCredentials: true })
        .then((res) => {
          if (res.data.error) {
            console.log(res.data.message);
          } else {
            setNotifications(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTotalNotif(user);
  }, [user]);

  return (
    <div className="container-fluid border-bottom bg-white fixed-top">
      <nav className="navbar">
        <div className="container p-0">
          <div className="d-flex justify-content-start align-items-center">
            <Link className="navbar-brand" to="/">
              <img
                src={require("../assets/logo.png")}
                alt="Bootstrap"
                height="40"
              />
            </Link>
          </div>

          <div className="d-flex justify-content-end align-items-center gap-2">
            {user === null || user === undefined ? (
              <>
                <Link
                  to="/login"
                  className="btn btn-outline-primary border-white text-dark"
                >
                  Login
                </Link>

                <Link to="/signup" className="btn btn-outline-primary fw-bold">
                  Create account
                </Link>
              </>
            ) : (
              <>
                <Link to="/new" className="btn btn-outline-primary fw-bold">
                  Ask A Question
                </Link>
                <Link to="/guidanceform" className="btn btn-primary fw-bold">
                  Personalized Guidance For Free
                </Link>
                <Link
                  to="/notification"
                  className="btn btn-outline-primary border-white position-relative"
                >
                  <i className="fa-regular fa-bell text-dark fs-4"></i>
                  {notifications > 0 ? (
                    <span
                      className="badge text-white bg-danger position-absolute top-0 start-50 px-1"
                      style={{
                        paddingTop: "2px",
                        paddingBottom: "2px",
                      }}
                    >
                      {notifications}
                    </span>
                  ) : (
                    ""
                  )}
                </Link>
                <div className="dropdown">
                  <button
                    className="border-0 bg-transparent p-0"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ width: "35px", height: "35px" }}
                  >
                    <img
                      src={user.avatar}
                      style={{ objectFit: "cover" }}
                      className="rounded-circle bg-light cover w-100 h-100 shadow-sm"
                      alt=""
                    />
                  </button>
                  <ul
                    className="dropdown-menu dropdown-menu-end my-1 pb-3 px-2 shadow-sm"
                    style={{ width: "250px" }}
                  >
                    <li className="border-bottom my-2 pb-2">
                      <Link
                        className="dropdown-item rounded text-dark"
                        to={"/" + user.username}
                      >
                        <b className="d-block">{user.name}</b>
                        <span style={{ fontSize: "13px" }}>
                          @{user.username}
                        </span>
                      </Link>
                    </li>

                    {user.role === "admin" ? (
                      <li>
                        <Link
                          className="dropdown-item rounded text-dark py-2"
                          to="/admin"
                        >
                          <span>Admin</span>
                        </Link>
                      </li>
                    ) : (
                      ""
                    )}

                    <li>
                      <Link
                        className="dropdown-item rounded text-dark py-2"
                        to="/dashboard"
                      >
                        <span>Dashboard</span>
                      </Link>
                    </li>

                    <li>
                      <Link
                        className="dropdown-item rounded text-dark py-2"
                        to="/new"
                      >
                        <span>Create Post</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item rounded text-dark py-2"
                        to="/userinfo"
                      >
                        <span>Profile Settings</span>
                      </Link>
                    </li>
                    <li>
                      <button
                        className="dropdown-item rounded text-dark py-2"
                        onClick={logout}
                      >
                        <span>Sign Out</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Nav;
