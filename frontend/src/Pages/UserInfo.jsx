import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import Footer from "../Components/Footer";
import Nav from "../Components/Nav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserInfo = () => {
  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    bio: "",
    location: "",
    education: "",
    experience: "",
  });

  const user = useContext(UserContext);
  useEffect(() => {
    setInputs(user);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_API_URL}/api/users/update`;

    await axios
      .post(url, { inputs, newavatar: user.avatar }, { withCredentials: true })
      .then((res) => {
        if (res.data.error) {
          toast.success(res.data.message, { type: "error" });
        } else {
          toast.success("Profile Updated Successfully", {
            type: "success",
            autoClose: 500,
          });
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Nav />
      <ToastContainer />

      <div className="container mt-5 pt-5">
        <div className="row mt-5">
          <div className="col-md-8 mx-auto">
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="fw-bold fs-5 mb-3">User</h5>
                  <div>
                    <div className="mb-4">
                      <label for="exampleInputEmail1" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control shadow-none"
                        id="name"
                        name="name"
                        value={inputs.name}
                        onInput={handleInputChange}
                        onPaste={handleInputChange}
                        placeholder="Masters in XYZ.."
                      />
                    </div>
                    <div className="mb-4">
                      <label for="exampleInputEmail1" className="form-label">
                        Username
                      </label>
                      <input
                        type="text"
                        className="form-control shadow-none"
                        id="username"
                        name="username"
                        value={inputs.username}
                        onInput={handleInputChange}
                        onPaste={handleInputChange}
                        placeholder="New York, USA, etc.."
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="fw-bold fs-5 mb-3">Basic</h5>
                  <div>
                    <div className="mb-4">
                      <label for="exampleInputEmail1" className="form-label">
                        Write a brief bio about yourself
                      </label>
                      <textarea
                        className="form-control shadow-none"
                        id="bio"
                        name="bio"
                        value={inputs.bio}
                        onInput={handleInputChange}
                        onPaste={handleInputChange}
                      ></textarea>
                    </div>
                    <div className="mb-4">
                      <label for="exampleInputEmail1" className="form-label">
                        Your Location
                      </label>
                      <input
                        type="text"
                        className="form-control shadow-none"
                        id="location"
                        name="location"
                        value={inputs.location}
                        onInput={handleInputChange}
                        onPaste={handleInputChange}
                        placeholder="New York, USA, etc.."
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="fw-bold fs-5 mb-3">Work</h5>
                  <div>
                    <div className="mb-4">
                      <label for="exampleInputEmail1" className="form-label">
                        Your Education
                      </label>
                      <input
                        type="text"
                        className="form-control shadow-none"
                        id="education"
                        name="education"
                        value={inputs.education}
                        onInput={handleInputChange}
                        onPaste={handleInputChange}
                        placeholder="Masters in XYZ.."
                      />
                    </div>
                    <div className="mb-4">
                      <label for="exampleInputEmail1" className="form-label">
                        Work Experience
                      </label>
                      <input
                        type="text"
                        className="form-control shadow-none"
                        id="experience"
                        name="experience"
                        value={inputs.experience}
                        onInput={handleInputChange}
                        onPaste={handleInputChange}
                        placeholder="CEO at abc, web developer at, etc.."
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="position-sticky d-block bottom-0 w-100 p-3 bg-white rounded border my-3 mb-5">
                <button type="submit" className="btn btn-primary w-100 fw-bold">
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default UserInfo;
