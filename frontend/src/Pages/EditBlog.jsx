import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { WithContext as ReactTags } from "react-tag-input";
import { toast, ToastContainer } from "react-toastify";

const EditBlog = () => {
  const [tags, setTags] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [title, settitle] = useState("");
  const [value, setValue] = useState("");
  const params = useParams();
  const postId = params.postid;

  const getTags = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/posts/tags`;
      const response = await axios.get(url, { withCredentials: true });
      let result = await response.data.map((item) => item.name);
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

  const getCurrentPost = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/posts/getpost`;
      const response = await axios.post(
        url,
        { postid: postId },
        { withCredentials: true }
      );
      settitle(response.data.post.title);
      setValue(response.data.post.body);
      var currentTags = response.data.post.tags.map((item) => {
        return { id: item, text: item };
      });
      setTags(currentTags);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTags();
    getCurrentPost();
  }, []);

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  // REACT QUILL
  const quillmodules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (tags.length < 1) {
      toast.success("Please add atleast 1 tag", {
        type: "warning",
      });
      return;
    }

    const url = `${process.env.REACT_APP_API_URL}/api/posts/edit`;
    await axios
      .post(
        url,
        {
          postid: postId,
          title: title,
          tags: tags,
          body: value,
          image: "",
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.error) {
          toast.success(res.data.message, { type: "error" });
        } else {
          toast.success("Post Published Successfully", {
            type: "success",
            autoClose: 500,
          });
          setTimeout(() => {
            window.location.href = `/${res.data.username}/${res.data.post.titleURL}`;
          }, 800);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="container bg-transparent">
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
              <span className="fw-bold">Ask a Question</span>
            </div>

            <div className="d-flex justify-content-end align-items-center gap-2">
              <Link to="/" className="btn btn-outline-dark fw-bold border-0">
                <i className="fa-solid fa-xmark"></i>
              </Link>
            </div>
          </div>
        </nav>
      </div>

      <div className="container pb-2">
        <div className="row">
          <div className="col-md-10">
            <ul
              className="nav nav-tabs justify-content-end border-0"
              id="myTab"
              role="tablist"
            >
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link text-dark active"
                  id="editor-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#editor"
                  type="button"
                  role="tab"
                  aria-controls="editor"
                  aria-selected="true"
                >
                  Editor
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link text-dark"
                  id="preview-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#preview"
                  type="button"
                  role="tab"
                  aria-controls="preview"
                  aria-selected="false"
                >
                  Preview
                </button>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="editor"
                role="tabpanel"
                aria-labelledby="editor-tab"
              >
                <form encType="multipart/form-data" onSubmit={handleSubmit}>
                  <div className="card px-md-4">
                    <div className="card-body">
                      <div className="my-3">
                        <textarea
                          name="text"
                          placeholder="New post title here..."
                          className="fw-bolder shadow-none fs-1 text-dark form-control border-0"
                          value={title}
                          onInput={(e) => {
                            settitle(e.target.value);
                          }}
                          required
                        ></textarea>
                      </div>
                      <div className="my-3 mb-5">
                        {suggestions !== undefined &&
                          suggestions.length > 0 && (
                            <ReactTags
                              tags={tags}
                              handleDelete={handleDelete}
                              handleAddition={handleAddition}
                              suggestions={suggestions}
                              inputFieldPosition="bottom"
                              autocomplete
                              editable
                              className="form-control border-0 shadow-none"
                              placeholder="Add upto 4 tags"
                            />
                          )}
                      </div>
                      <div className="my-3">
                        <ReactQuill
                          theme="snow"
                          value={value}
                          onChange={setValue}
                          modules={quillmodules}
                          formats={formats}
                          placeholder="Write your post content here..."
                        />
                      </div>
                    </div>
                  </div>
                  <div className="btns mt-3">
                    <button className="btn btn-primary fw-bold" type="submit">
                      Update your Question
                    </button>
                  </div>
                </form>
              </div>
              <div
                className="tab-pane fade"
                id="preview"
                role="tabpanel"
                aria-labelledby="preview-tab"
              >
                <div className="card w-100 overflow-hidden px-md-0">
                  <div className="card-body bg-white p-lg-5">
                    <div className="post-details mb-5">
                      <h1 className="fw-bolder fs-1 py-3 text-dark">{title}</h1>
                      <div
                        className="post-tags d-flex gap-3 mb-4"
                        style={{ fontSize: "15px" }}
                      >
                        {tags.map((item) => {
                          return (
                            <Link
                              to={"/tag/" + item.text}
                              key={item.id}
                              target="_blank"
                              className="text-decoration-none text-dark bg-light px-2 py-1 rounded"
                            >
                              {item.text}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                    <div className="post-description">
                      <ReactQuill
                        value={value}
                        readOnly={true}
                        theme={"bubble"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default EditBlog;
