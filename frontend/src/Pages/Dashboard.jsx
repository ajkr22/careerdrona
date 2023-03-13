import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import Footer from "../Components/Footer";
import Nav from "../Components/Nav";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  const user = useContext(UserContext);

  const getUserProfile = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/users/dashboard`;
      const response = await axios.post(
        url,
        { username: user.username },
        { withCredentials: true }
      );
      setPosts(response.data.post);
      setComments(response.data.comments);
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

  function DeletePost(e) {
    const postid = e.target.value;
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/posts/delete`;
      axios.post(url, { post: postid }, { withCredentials: true });
      window.location.href = "/dashboard";
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Nav />

      <div className="container my-5 py-5">
        <h2 className="fs-2 text-dark fw-bolder">Dashboard</h2>
        <div className="row mt-5">
          <div className="col-md-4 mb-2">
            <div className=" bg-white border rounded p-4">
              <div className="fs-2 text-dark fw-bolder">{comments}</div>
              <span className="text-secondary">Total post comments</span>
            </div>
          </div>
          <div className="col-md-4 mb-2">
            <div className=" bg-white border rounded p-4">
              <div className="fs-2 text-dark fw-bolder">{posts.length}</div>
              <span className="text-secondary">Total posts created</span>
            </div>
          </div>
        </div>
        <div className="row my-4 p-md-3">
          <div className="col-md-12">
            <h2 className="fs-4 text-dark fw-bolder mb-4">Posts</h2>
            {posts.map((post) => {
              return (
                <div className="card mb-2" key={post._id}>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <Link
                          to={"/" + user.username + "/" + post.titleURL}
                          className="fs-5 fw-bolder d-block text-decoration-none"
                          target="_blank"
                        >
                          {post.title}
                        </Link>
                        <span style={{ fontSize: "14px" }}>
                          <b>Published:</b> {formatDate(post.createdAt)}
                        </span>
                      </div>
                      <div className="col-md-6" style={{ fontSize: "14px" }}>
                        <div className="d-flex justify-content-between align-items-center h-100">
                          <div className="d-flex gap-3 text-secondary">
                            <span className="bg-transparent border-0">
                              <i className="fa-regular fa-comment pe-1"></i>
                              <span>{post.comments.length}</span>
                            </span>
                          </div>
                          <div className="d-flex gap-3">
                            <Link
                              to={"/edit/" + post._id}
                              className="text-decoration-none text-dark"
                            >
                              Edit
                            </Link>
                            <button
                              value={post._id}
                              onClick={DeletePost}
                              className="border-0 bg-transparent p-0 m-0 d-inline text-dark"
                            >
                              Delete
                            </button>
                          </div>
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

      <Footer />
    </>
  );
};
export default Dashboard;
