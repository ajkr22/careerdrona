import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../Components/Footer";
import Nav from "../Components/Nav";
import Verified from "../Components/Verified";

const Profile = () => {
  const params = useParams();
  const username = params.username;
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [profileUser, setProfileUser] = useState([]);

  const getUserProfile = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/users/profile/${username}`;
      const response = await axios.get(url);
      setPosts(response.data.post);
      setComments(response.data.comments);
      setProfileUser(response.data.author);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.toDateString()}`;
  }

  return (
    <>
      <Nav />
      <div className="container-fluid mt-5 pt-5 p-0 bg-primary">
        <div className="bg-primary p-5"></div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-10 mx-auto px-0 px-md-2">
            <div
              className="card bg-white text-md-center mb-4"
              style={{ marginTop: "-40px" }}
            >
              <div className="card-header bg-white mx-md-auto border-0">
                <div
                  className="user-profile-img"
                  style={{
                    width: "110px",
                    height: "110px",
                    marginTop: "-50px",
                  }}
                >
                  <img
                    src={profileUser.avatar}
                    className="rounded-circle bg-light cover w-100 h-100 shadow-sm"
                    alt={profileUser.name}
                    style={{ border: "6px solid #0d6efd", objectFit: "cover" }}
                  />
                </div>
              </div>
              <div className="card-body pb-4">
                <h1 className="fw-bolder fs-2 text-dark">
                  {profileUser.name}
                  {profileUser.role === "expert" ? <Verified /> : ""}
                </h1>
                <p className="bio mb-4">{profileUser.bio}</p>
                <div className="user-details text-secondary">
                  {profileUser.location !== "" ||
                  profileUser.location !== null ? (
                    <span className="me-4 d-inline-block">
                      <i className="fa-solid fa-location-dot pe-2 fs-5"></i>
                      <span style={{ fontSize: "14px" }}>
                        {profileUser.location}
                      </span>
                    </span>
                  ) : (
                    ""
                  )}

                  <span className="me-4 d-inline-block">
                    <i className="fa-solid fa-cake-candles pe-2 fs-5"></i>
                    <span style={{ fontSize: "14px" }}>
                      Joined on {formatDate(profileUser.joinDate)}
                    </span>
                  </span>
                </div>
              </div>
              <div className="card-footer bg-white pt-4">
                <div className="row">
                  <div className="col-md-6">
                    <b className="text-secondary" style={{ fontSize: "14px" }}>
                      Education
                    </b>
                    <p>{profileUser.education}</p>
                  </div>
                  <div className="col-md-6">
                    <b className="text-secondary" style={{ fontSize: "14px" }}>
                      Work
                    </b>
                    <p>{profileUser.experience}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row my-4">
              <div className="col-md-4">
                <div className="card overflow-hidden">
                  <div className="card-body bg-light pb-0">
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <i className="fa-solid fa-table-list text-secondary fs-5"></i>
                      <span>{posts.length} post(s) published</span>
                    </div>
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <i className="fa-regular fa-comment text-secondary fs-5"></i>
                      <span>{comments.length} comments written</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                {posts.map((post) => {
                  return (
                    <div
                      className="card w-100 overflow-hidden mb-2"
                      key={post._id}
                    >
                      <div className="card-body bg-white">
                        <div className="d-flex gap-2 align-items-center">
                          <Link
                            className="post-img text-decoration-none"
                            target="_blank"
                            to={"/" + profileUser.username}
                            style={{ width: "2rem", height: "2rem" }}
                          >
                            <img
                              src={profileUser.avatar}
                              className="rounded-circle bg-light cover w-100 h-100 shadow-sm"
                              alt=""
                              style={{ objectFit: "cover" }}
                            />
                          </Link>
                          <div className="post-metadata">
                            <div>
                              <Link
                                to={"/" + profileUser.username}
                                target="_blank"
                                className="text-decoration-none m-0 p-0 text-dark fw-bold"
                                style={{ fontSize: "14px" }}
                              >
                                {profileUser.name}
                              </Link>
                              {profileUser.role === "expert" ? (
                                <Verified />
                              ) : (
                                ""
                              )}
                            </div>
                            <a
                              href="as"
                              className="text-decoration-none m-0 p-0 text-dark d-block"
                              style={{ fontSize: "12px" }}
                            >
                              {formatDate(post.createdAt)}
                            </a>
                          </div>
                        </div>
                        <div
                          className="post-details my-3"
                          style={{ paddingLeft: "42px" }}
                        >
                          <h3 className="fw-bolder">
                            <Link
                              to={
                                "/" + profileUser.username + "/" + post.titleURL
                              }
                              className="text-decoration-none text-dark"
                              target="_blank"
                            >
                              {post.title}
                            </Link>
                          </h3>

                          <div
                            className="post-tags d-flex gap-3 mb-4"
                            style={{ fontSize: "14px" }}
                          >
                            {post.tags.map((item) => {
                              return (
                                <Link
                                  to={"/tag/" + item}
                                  key={item}
                                  className="text-decoration-none text-dark bg-light px-2 py-1 rounded"
                                >
                                  {item}
                                </Link>
                              );
                            })}
                          </div>
                          <div className="post-stats d-flex space-between">
                            <div
                              className="d-flex gap-3"
                              style={{ fontSize: "14px" }}
                            >
                              <span
                                href="as"
                                className="text-decoration-none text-dark bg-light px-2 py-1 rounded"
                              >
                                <i className="fa-regular fa-comment pe-1"></i>
                                {post.comments.length} Comments
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div className="user_comments mt-4">
                  <ul className="list-group">
                    <li className="list-group-item py-3 fs-5 fw-bold">
                      Recent Comments
                    </li>
                    {comments.map((comment) => {
                      return (
                        <li
                          className="list-group-item dropdown-item"
                          key={comment._id}
                        >
                          <Link
                            to={
                              "/" +
                              profileUser.username +
                              "/" +
                              comment.post.titleURL
                            }
                            className="d-block w-100 text-decoration-none text-dark"
                            style={{ whiteSpace: "break-spaces" }}
                            target="_blank"
                          >
                            <span className="fs-6 fw-bold">
                              {comment.post.title}
                            </span>
                            <div
                              className="d-flex align-items-center gap-2"
                              style={{ fontSize: "14px" }}
                            >
                              <p className="m-0 p-0">{comment.body}</p>
                              <span className="date d-block text-secondary">
                                {formatDate(comment.createdAt)}
                              </span>
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Profile;
