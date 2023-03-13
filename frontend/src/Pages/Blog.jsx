


import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { UserContext } from "../App.js";
import Footer from "../Components/Footer.jsx";
import Nav from "../Components/Nav.jsx";
import Verified from "../Components/Verified.jsx";

function Blog() {
  const params = useParams();
  const title = params.title;
  const username = params.username;
  const [post, setPost] = useState("");
  const [comments, setComments] = useState("");
  const [author, setAuthor] = useState("");
  const [commentLikeId, setcommentLikeId] = useState(null);

  const user = useContext(UserContext);

  const getPostDetails = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/posts/${username}/${title}`;
      const response = await axios.get(url);
      console.log(response.data);
      setPost(response.data.post);
      setAuthor(response.data.author);
      setComments(response.data.comments);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPostDetails();
  }, []);

  const [commentText, setCommentText] = useState("");
  const handleCommentSubmit = async () => {
    if (commentText.trim() === "") {
      toast.error("Please add comment body");
    } else {
      const url = `${process.env.REACT_APP_API_URL}/api/posts/comment`;
      await axios
        .post(
          url,
          {
            body: commentText,
            post: post._id,
            author: user._id,
          },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.data.error) {
            toast.error(res.data.message);
          } else {
            toast.success("Comment Added Successfully", {
              type: "success",
              autoClose: 500,
            });
            setTimeout(() => {
              window.location.href = `/${username}/${title}`;
            }, 800);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const likePost = async () => {
    if (!user) {
      toast.error("Login or Sign up to like this post");
      return;
    }
    const url = `${process.env.REACT_APP_API_URL}/api/posts/like`;
    await axios
      .post(
        url,
        {
          post: post._id,
          author: user._id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.error) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message, {
            type: "success",
            autoClose: 500,
          });
          setTimeout(() => {
            window.location.href = `/${username}/${title}`;
          }, 800);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const likeComment = async (e) => {
    if (!user) {
      toast.error("Login or Sign up to like this comment");
      return;
    }
    const url = `${process.env.REACT_APP_API_URL}/api/posts/comment/like`;
    await axios
      .post(
        url,
        {
          comment: e.target.value,
          author: user._id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.error) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message, {
            type: "success",
            autoClose: 500,
          });
          setTimeout(() => {
            window.location.href = `/${username}/${title}`;
          }, 800);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.toDateString()}`;
  }

  return (
    <>
      <Nav />
      <ToastContainer />

      {post && post !== undefined && (
        <div className="container py-4 mt-5">
          <div className="row pt-4">
            <div className="col-xl-9 col-lg-9 col-md-9 col-sm-12 col-xs-12 mb-4">
              <div className="card w-100 overflow-hidden mb-2">
                <div className="card-body bg-white p-lg-5 pt-4">
                  <div className="d-flex gap-2 align-items-center">
                    <Link
                      className="post-img text-decoration-none"
                      to={"/" + author.username}
                      style={{ width: "2.5rem", height: "2.5rem" }}
                    >
                      <img
                        src={author.avatar}
                        className="rounded-circle bg-light cover w-100 h-100 shadow-sm"
                        alt=""
                        style={{ objectFit: "cover" }}
                      />
                    </Link>
                    <div className="post-metadata">
                      <div>
                        <Link
                          to={"/" + author.username}
                          className="text-decoration-none m-0 p-0 text-dark fw-bold"
                          style={{ fontSize: "16px" }}
                        >
                          {author.name}
                        </Link>
                        {author.role === "expert" ? <Verified /> : ""}
                      </div>
                      <div
                        className="text-decoration-none m-0 p-0 text-dark d-block"
                        style={{ fontSize: "11px" }}
                      >
                        Posted on {formatDate(post.createdAt)}
                      </div>
                    </div>
                  </div>
                  <div className="post-details my-3 mb-5">
                    <h1 className="fw-bolder fs-1 py-3 text-dark">
                      {post.title}
                    </h1>
                    <div
                      className="post-tags d-flex gap-3 mb-4"
                      style={{ fontSize: "15px" }}
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
                  </div>
                  <div className="post-description border-bottom pb-2 mb-4">
                    <div dangerouslySetInnerHTML={{ __html: post.body }} />
                  </div>

                  {/* comments */}
                  <div className="post-comments">
                    <h3 className="fw-bolder">
                      Comments ({post.comments.length})
                    </h3>

                    {/* <Link
                        to="/signup"
                        className="d-block fw-bold text-center my-4 py-3 bg-light rounded text-decoration-none"
                      >
                        Sign in or Create an Account to Leave a Comment
                      </Link> */}

                    {user !== null && user !== undefined ? (
                      <div className="d-flex gap-2 mt-4">
                        <div style={{ width: "30px", height: "30px" }}>
                          <img
                            src={user.avatar}
                            className="rounded-circle bg-light cover w-100 h-100 shadow-sm"
                            style={{ objectFit: "cover" }}
                            alt=""
                          />
                        </div>
                        <div style={{ width: "90%" }}>
                          <textarea
                            className="form-control d-block w-100 shadow-none"
                            rows={5}
                            placeholder="Add to Discussion"
                            value={commentText}
                            onInput={(e) => {
                              setCommentText(e.target.value);
                            }}
                          ></textarea>
                          <div className="btns mt-2">
                            <button
                              className="btn btn-primary fw-bold"
                              type="submit"
                              onClick={handleCommentSubmit}
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <textarea
                          className="form-control d-block w-100 shadow-none mt-5 bg-white"
                          rows={5}
                          placeholder="Add to Discussion"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          disabled
                        ></textarea>
                        <div
                          class="modal fade"
                          id="exampleModal"
                          tabindex="-1"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">
                                  Log in to continue
                                </h5>
                                <button
                                  type="button"
                                  class="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div class="modal-body">
                                We're a place where coders share, stay
                                up-to-date and grow their careers.
                              </div>
                              <div class="modal-footer border-0 text-center d-block">
                                <button
                                  onClick={(e) => {
                                    window.location.href = "/login";
                                  }}
                                  class="btn btn-primary fw-bold w-75"
                                  data-bs-dismiss="modal"
                                  // to="/login"
                                >
                                  Log in
                                </button>
                                <button
                                  class="btn btn-outline-light text-primary fw-bold w-75"
                                  onClick={(e) => {
                                    window.location.href = "/signup";
                                  }}
                                >
                                  Create account
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    <div className="comments mt-5">
                      {comments.map((comment) => {
                        return (
                          <div className="comment mb-4">
                            <div className="d-flex gap-2">
                              <div style={{ width: "30px", height: "30px" }}>
                                <img
                                  src={comment.author.avatar}
                                  className="rounded-circle bg-light cover w-100 h-100 shadow-sm"
                                  style={{ objectFit: "cover" }}
                                  alt=""
                                />
                              </div>
                              <div style={{ width: "90%" }}>
                                <div className="card">
                                  <div className="card-body">
                                    <div className="d-flex gap-3">
                                      <span className="d-block fs-6 text-dark fw-bold">
                                        {comment.author.name}
                                        {comment.author.role === "expert" ? (
                                          <Verified />
                                        ) : (
                                          ""
                                        )}
                                      </span>
                                      <span className="d-block fs-6 text-secondary">
                                        {formatDate(comment.createdAt)}
                                      </span>
                                    </div>
                                    <div className="comment-content mt-2">
                                      <p>{comment.body}</p>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="d-flex gap-3 mt-1 ps-2"
                                  style={{ fontSize: "14px" }}
                                >
                                  <button
                                    className="text-decoration-none text-dark bg-light px-2 py-1 rounded border-0"
                                    value={comment._id}
                                    onClick={likeComment}
                                  >
                                    <i className="fa-regular fa-heart pe-1"></i>
                                    {comment.likes.length} reactions
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-md-3 col-sm-12 col-xs-12">
              <div
                className="d-flex gap-4 align-items-sm-start justify-content-center"
                style={{
                  position: "sticky",
                  top: "calc(56px + 1rem)",
                }}
              >
                <div className="card bg-light w-100">
                  <div className="card-header bg-dark p-3"></div>
                  <div className="card-body pb-0">
                    <div
                      className="d-flex gap-2 align-items-center"
                      style={{ marginTop: "-31px" }}
                    >
                      <Link
                        className="post-img text-decoration-none"
                        to={"/" + author.username}
                      >
                        <img
                          src={author.avatar}
                          className="rounded-circle bg-light cover shadow-sm"
                          alt=""
                          style={{
                            width: "2.5rem",
                            height: "2.5rem",
                            objectFit: "cover",
                          }}
                        />
                      </Link>
                      <Link
                        className="post-img text-decoration-none mt-3 text-dark"
                        to={"/" + author.username}
                      >
                        <h5 className="card-title fw-bold">{author.name}</h5>
                      </Link>
                    </div>
                    <div style={{ fontSize: "15px" }}>
                      <p className="card-text my-3">{author.bio}</p>
                      <p className="card-text my-3">
                        <b>EDUCATION</b>
                        <br />
                        {author.education}
                      </p>
                      <p className="card-text my-3">
                        <b>WORK</b>
                        <br />
                        {author.experience}
                      </p>
                      <p className="card-text my-3">
                        <b>JOINED</b>
                        <br />
                        {formatDate(author.joinDate)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default Blog;
