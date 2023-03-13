import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Tags from "../Components/Tags";
import Verified from "../Components/Verified";

function Relevant() {
  const [posts, setPosts] = useState([]);

  const getPostDetails = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/posts/relevant`;
      const response = await axios.get(url);
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.toDateString()}`;
  }

  useEffect(() => {
    getPostDetails();
  }, []);

  return (
    <div className="container py-4 mt-5">
      {posts && (
        <div className="row pt-4">
          <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-xs-12 d-none d-sm-block mb-5">
            <Tags />
          </div>
          <div className="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-xs-12">
            <div className="d-flex gap-4">
              <Link
                to="/"
                className="d-block text-decoration-none text-dark fs-6 fw-bold"
              >
                Relevant
              </Link>
              <Link
                to="/latest"
                className="d-block text-decoration-none text-secondary fs-6 fw-normal"
              >
                Latest
              </Link>
              <Link
                to="/top"
                className="d-block text-decoration-none text-secondary fs-6 fw-normal"
              >
                Top
              </Link>
            </div>

            <div className="posts my-3">
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
                          to={"/" + post.author.username}
                          style={{ width: "2rem", height: "2rem" }}
                        >
                          <img
                            src={post.author.avatar}
                            style={{ objectFit: "cover" }}
                            className="rounded-circle bg-light cover w-100 h-100 shadow-sm"
                            alt=""
                          />
                        </Link>
                        <div className="post-metadata">
                          <div>
                            <Link
                              to={"/" + post.author.username}
                              className="text-decoration-none m-0 p-0 text-dark fw-bold"
                              style={{ fontSize: "14px" }}
                            >
                              {post.author.name}
                            </Link>
                            {post.author.role === "expert" ? <Verified /> : ""}
                          </div>
                          <span
                            className="text-decoration-none m-0 p-0 text-dark d-block"
                            style={{ fontSize: "12px" }}
                          >
                            {formatDate(post.createdAt)}
                          </span>
                        </div>
                      </div>
                      <div
                        className="post-details my-3"
                        style={{ paddingLeft: "42px" }}
                      >
                        <h3 className="fw-bolder">
                          <Link
                            to={
                              "/" + post.author.username + "/" + post.titleURL
                            }
                            className="text-decoration-none text-dark"
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
                            <Link
                              to={
                                "/" + post.author.username + "/" + post.titleURL
                              }
                              className="text-decoration-none text-dark bg-light px-2 py-1 rounded"
                            >
                              <i className="fa-regular fa-comment pe-1"></i>
                              {post.comments.length} comments
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {/* <div className="card w-100 overflow-hidden mb-2">
                <div className="card-header p-0" style={{ height: "275px" }}>
                  <img
                    src={require("../assets/blog.webp")}
                    className="card-img-top w-100 h-100"
                    style={{ objectFit: "cover" }}
                    alt="..."
                  />
                </div>
                <div className="card-body bg-white">
                  <div className="d-flex gap-2 align-items-center">
                    <a
                      className="post-img text-decoration-none"
                      href="as"
                      style={{ width: "2rem", height: "2rem" }}
                    >
                      <img
                        src={require("../assets/user.jpeg")}
                        className="rounded-circle bg-light cover w-100 h-100 shadow-sm"
                        alt=""
                      />
                    </a>
                    <div className="post-metadata">
                      <div>
                        <a
                          href="as"
                          className="text-decoration-none m-0 p-0 text-dark fw-bold"
                          style={{ fontSize: "14px" }}
                        >
                          Ivan SImaoa
                        </a>
                      </div>
                      <a
                        href="as"
                        className="text-decoration-none m-0 p-0 text-dark d-block"
                        style={{ fontSize: "12px" }}
                      >
                        1 Aug, 2023
                      </a>
                    </div>
                  </div>
                  <div
                    className="post-details my-3"
                    style={{ paddingLeft: "42px" }}
                  >
                    <h3 className="fw-bolder">
                      <Link
                        to="/blog"
                        className="text-decoration-none text-dark"
                      >
                        VS Code Setup for Frontend Devs
                      </Link>
                    </h3>

                    <div
                      className="post-tags d-flex gap-3 mb-4"
                      style={{ fontSize: "14px" }}
                    >
                      <a
                        href="as"
                        className="text-decoration-none text-dark bg-light px-2 py-1 rounded"
                      >
                        #vscode
                      </a>
                      <a
                        href="as"
                        className="text-decoration-none text-dark bg-light px-2 py-1 rounded"
                      >
                        #javascript
                      </a>
                      <a
                        href="as"
                        className="text-decoration-none text-dark bg-light px-2 py-1 rounded"
                      >
                        #tutorial
                      </a>
                    </div>
                    <div className="post-stats d-flex space-between">
                      <div
                        className="d-flex gap-3"
                        style={{ fontSize: "14px" }}
                      >
                        <a
                          href="as"
                          className="text-decoration-none text-dark bg-light px-2 py-1 rounded"
                        >
                          <i className="fa-regular fa-heart pe-1"></i>2 reactions
                        </a>
                        <a
                          href="as"
                          className="text-decoration-none text-dark bg-light px-2 py-1 rounded"
                        >
                          <i className="fa-regular fa-comment pe-1"></i>Add Comment
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card w-100 overflow-hidden mb-2">
                <div className="card-body bg-white">
                  <div className="d-flex gap-2 align-items-center">
                    <a
                      className="post-img text-decoration-none"
                      href="as"
                      style={{ width: "2rem", height: "2rem" }}
                    >
                      <img
                        src={require("../assets/user.jpeg")}
                        className="rounded-circle bg-light cover w-100 h-100 shadow-sm"
                        alt=""
                      />
                    </a>
                    <div className="post-metadata">
                      <div>
                        <a
                          href="as"
                          className="text-decoration-none m-0 p-0 text-dark fw-bold"
                          style={{ fontSize: "14px" }}
                        >
                          Ivan SImaoa
                        </a>
                      </div>
                      <a
                        href="as"
                        className="text-decoration-none m-0 p-0 text-dark d-block"
                        style={{ fontSize: "12px" }}
                      >
                        1 Aug, 2023
                      </a>
                    </div>
                  </div>
                  <div
                    className="post-details my-3"
                    style={{ paddingLeft: "42px" }}
                  >
                    <h3 className="fw-bolder">
                      <a href="as" className="text-decoration-none text-dark">
                        VS Code Setup for Frontend Devs
                      </a>
                    </h3>

                    <div
                      className="post-tags d-flex gap-3 mb-4"
                      style={{ fontSize: "14px" }}
                    >
                      <a
                        href="as"
                        className="text-decoration-none text-dark bg-light px-2 py-1 rounded"
                      >
                        #vscode
                      </a>
                      <a
                        href="as"
                        className="text-decoration-none text-dark bg-light px-2 py-1 rounded"
                      >
                        #javascript
                      </a>
                      <a
                        href="as"
                        className="text-decoration-none text-dark bg-light px-2 py-1 rounded"
                      >
                        #tutorial
                      </a>
                    </div>
                    <div className="post-stats d-flex space-between">
                      <div
                        className="d-flex gap-3"
                        style={{ fontSize: "14px" }}
                      >
                        <a
                          href="as"
                          className="text-decoration-none text-dark bg-light px-2 py-1 rounded"
                        >
                          <i className="fa-regular fa-heart pe-1"></i>2 reactions
                        </a>
                        <a
                          href="as"
                          className="text-decoration-none text-dark bg-light px-2 py-1 rounded"
                        >
                          <i className="fa-regular fa-comment pe-1"></i>Add Comment
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          {/* <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-12"></div> */}
        </div>
      )}
    </div>
  );
}

export default Relevant;
