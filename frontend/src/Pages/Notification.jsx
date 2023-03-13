import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import Footer from "../Components/Footer";
import Nav from "../Components/Nav";
import Verified from "../Components/Verified";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const user = useContext(UserContext);
  const getTotalNotif = async (user) => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/posts/notificationsdata`;
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

  function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.toDateString()}`;
  }

  return (
    <>
      <Nav />

      {notifications && (
        <div className="container my-5 py-5">
          <h2 className="fs-2 text-dark fw-bolder">Notifications</h2>
          <div className="row my-4 p-md-3">
            <div className="col-md-12">
              {notifications.map((not) => {
                return (
                  <div className="card mb-2" key={not._id}>
                    <div className="card-body">
                      <div className="comment mb-4">
                        <div className="d-flex gap-3">
                          <div style={{ width: "50px", height: "50px" }}>
                            <img
                              src={not.author.avatar}
                              className="rounded-circle bg-light cover w-100 h-100 shadow-sm"
                              style={{ objectFit: "cover" }}
                              alt=""
                            />
                          </div>
                          <div style={{ width: "90%" }}>
                            <p className="m-0">
                              <Link
                                to={"/" + not.author.username}
                                className="fw-bold text-decoration-none text-dark"
                              >
                                {not.author.name}
                              </Link>
                              {not.author.role === "expert" ? <Verified /> : ""}
                              <span className="px-2">commented on</span>
                              <Link
                                to={
                                  "/" + user.username + "/" + not.post.titleURL
                                }
                                className="fw-bold text-decoration-none text-dark"
                              >
                                {not.post.title}
                              </Link>
                            </p>
                            <span className="d-block fs-6 text-secondary mb-3">
                              {formatDate(not.createdAt)}
                            </span>
                            <div className="card p-2">
                              <div className="card-body p-0">
                                <div className="comment-content">
                                  <p className="p-0 m-0">{not.body}</p>
                                </div>
                              </div>
                            </div>
                            <div
                              className="d-flex gap-3 mt-1 ps-2"
                              style={{ fontSize: "14px" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};
export default Notification;
