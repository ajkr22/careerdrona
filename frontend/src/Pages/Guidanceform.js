import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";

const Guidanceform = () => {
  const [tag, setTag] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const [selectTags, setSelectTags] = useState([]);
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      phoneno: "",
      email: "",
      domain: "",
      question: "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      lastname: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      phoneno: Yup.number().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      domain: Yup.string().required("Required"),
      question: Yup.string()
        .max(200, "Must be in 200 words or less")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2));

      const url = `${process.env.REACT_APP_API_URL}/api/contacts/`;
      const res = await axios
        .post(url, values, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.error) {
            toast.success(res.data.message, { type: "error" });
          } else {
            toast.success("Post Published Successfully", {
              type: "success",
              autoClose: 500,
            });
            setTimeout(() => {
              window.location.href = `/`;
            }, 800);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(res.data);
    },
    //////////////////////////////
  });

  const getTags = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/posts/tags`;
      const response = await axios.get(url, { withCredentials: true });
      let result = await response.data.map((item) => item.name);
      setSelectTags(result);
      console.log(selectTags);
      let suggestions = result.map((country) => {
        return {
          id: country,
          text: country,
        };
      });
      setSuggestions(suggestions);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    getTags();
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="container">
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group mt-4">
            <label htmlFor="firstname">First Name</label>
            <input
              className="form-control"
              id="firstname"
              name="firstname"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstname}
            />
          </div>
          {formik.touched.firstname && formik.errors.firstname ? (
            <div>{formik.errors.firstname}</div>
          ) : null}
          <div className="form-group mt-4">
            <label htmlFor="lastname">Last Name</label>

            <input
              className="form-control"
              id="lastname"
              name="lastname"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastname}
            />
          </div>
          {formik.touched.lastname && formik.errors.lastname ? (
            <div>{formik.errors.lastname}</div>
          ) : null}
          <div className="form-group mt-4">
            <label htmlFor="email">Email Address</label>

            <input
              className="form-control"
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
          </div>
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
          <div className="form-group mt-4">
            <label htmlFor="phoneno">Phone Number</label>

            <input
              className="form-control"
              id="phoneno"
              name="phoneno"
              type="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phoneno}
            />
          </div>
          {formik.touched.phoneno && formik.errors.phoneno ? (
            <div>{formik.errors.phoneno}</div>
          ) : null}
          {/* Select Domain Code Start */}
          <div className="form-group mt-4">
            <label htmlFor="domian">Select a Domain</label>
            {selectTags !== undefined && selectTags.length > 0 && (
              <select
                name="domain"
                id="domain"
                className="form-control"
                type="select"
                // onChange={(e) => {
                //   setTag(e.target.value);
                // }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.domain}
              >
                {/*  <option disabled selected value="">
                  Please select a domain
                </option> */}
                {/* <option hidden selected value="">
                  Select one...
                </option> */}

                <option value="" label="Select a Domain" disabled />
                {selectTags.map((item) => {
                  return <option value={item}>{item}</option>;
                })}
              </select>
            )}
          </div>
          {/* {formik.touched.domian && formik.errors.domain ? (
            <div>{formik.errors.domian}</div>
          ) : null} */}

          {formik.touched.domian && formik.errors.domain && (
            <div className="input-feedback">{formik.errors.domian}</div>
          )}

          {/* Select Domain Code End */}
          <div className="form-group mt-4">
            <label htmlFor="question">Write your Question ?</label>

            <textarea
              className="form-control"
              id="question"
              name="question"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.question}
            />
          </div>
          {formik.touched.question && formik.errors.question ? (
            <div>{formik.errors.question}</div>
          ) : null}
          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-primary mt-4 btn-lg btn-block"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Guidanceform;
