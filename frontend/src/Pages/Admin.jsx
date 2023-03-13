import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { UserContext } from "../App";
import Footer from "../Components/Footer";
import Nav from "../Components/Nav";
import Verified from "../Components/Verified";

function Admin() {
  const [users, setUsers] = useState([]);
  const u = useContext(UserContext);

  const getUsers = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/admin/users`;
      const response = await axios.post(
        url,

        { u: u },
        { withCredentials: true }
      );
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const changeRole = async (e) => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/admin/changerole`;
      const response = await axios.post(
        url,
        { u: u, uid: e.target.value },
        { withCredentials: true }
      );

      toast.success("User Updated Successfully");
      var currentUsers = users.slice();
      currentUsers = [...response.data];
      setUsers(currentUsers);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Nav />
      <ToastContainer />
      {users && (
        <div className="container my-5 py-5">
          <h2 className="fs-2 text-dark fw-bolder">Admin</h2>

          <div className="row my-4 p-md-3">
            <div className="col-md-12">
              <h2 className="fs-4 text-dark fw-bolder mb-4">Users</h2>
              <div className="card mb-2">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="table-responsive">
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">Image</th>
                              <th scope="col">Name</th>
                              <th scope="col">Username</th>
                              <th scope="col">Email</th>
                              <th scope="col">Role</th>
                              <th scope="col">Profile</th>
                              <th scope="col">Change Role</th>
                            </tr>
                          </thead>
                          <tbody>
                            {users.map((user) => {
                              return (
                                <tr key={user._id}>
                                  <td>
                                    <img
                                      src={user.avatar}
                                      alt={user.name}
                                      className="rounded-circle"
                                      height="50px"
                                      width="50px"
                                      style={{ objectFit: "cover" }}
                                    />
                                  </td>
                                  <td>
                                    {user.name}{" "}
                                    {user.role === "expert" ? <Verified /> : ""}
                                  </td>
                                  <td>@{user.username}</td>
                                  <td>{user.email}</td>
                                  <td>{user.role}</td>
                                  <td>
                                    <Link
                                      className="btn btn-outline-info text-dark"
                                      to={"/" + user.username}
                                      target="_blank"
                                    >
                                      View Profile
                                    </Link>
                                  </td>
                                  <td>
                                    <button
                                      className="btn btn-primary"
                                      value={user._id}
                                      onClick={changeRole}
                                    >
                                      {user.role === "user"
                                        ? "Change Role to Expert"
                                        : "Change Role to User"}
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
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

export default Admin;
