import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import Nav from "../Components/Nav";

const SignUp = () => {
  const googleAuth = () => {
    window.open(
      `${process.env.REACT_APP_API_URL}/api/auth/google/callback`,
      "_self"
    );
  };

  return (
    <>
      <Nav />
      <div className="container my-5 pt-5">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card text-center px-md-4 my-5 py-4">
              <div className="card-body">
                <h2 className="fw-bolder">Welcome to CareerDrona Community</h2>
                <p>
                Know the right path for the right destination
                </p>
                <div className="d-flex gap-2 flex-column mt-4 mb-3">
                  <button
                    className="btn btn-lg fs-6 fw-bold btn-google bg-light btn-block btn-outline d-flex border justify-content-center py-2"
                    onClick={googleAuth}
                  >
                    <img
                      src="https://img.icons8.com/color/256/google-logo.png"
                      alt=""
                      className="px-3"
                      height="25px"
                    />
                    <span>Sign up with Google</span>
                  </button>
                </div>
                <div
                  className="border-light border-bottom border-2 mb-3"
                  style={{
                    height: "20px",
                  }}
                >
                  <div
                    className="pt-2 bg-white d-inline-block px-2"
                    style={{ fontSize: "14px" }}
                  >
                    Already have an account?
                    <Link to="/login" className="ps-1 text-decoration-none">
                      Log in.
                    </Link>
                  </div>
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
export default SignUp;
