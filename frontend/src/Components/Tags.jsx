import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Tags() {
  const [tags, setTags] = useState(["ClASS 9th AND 10th","IITJEE AND MAINS","GATE OR ESE","IT AND PLACEMENT","OTHER"]);
  const getTags = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/posts/tags`;
      const response = await axios.get(url, { withCredentials: true });
      let result = await response.data.map((item) => item.name);
      setTags(result);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    getTags();
  }, []);

  return (
    <div className="side-tags">
      {tags && (
        <div className="accordion" id="tags_accord">
          <div className="accordion-item bg-transparent border-0">
            <h2 className="accordion-header border-0" id="tags_accord_heading">
              <button
                className="accordion-button bg-transparent shadow-none pt-1"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#accord_tags_collapse"
                aria-expanded="true"
                aria-controls="accord_tags_collapse"
              >
                <span className="d-block text-dark fs-6 fw-bold">
                  Popular Tags
                </span>
              </button>
            </h2>
            <div
              id="accord_tags_collapse"
              className="accordion-collapse collapse show"
              aria-labelledby="tags_accord_heading"
            >
              <div className="accordion-body">
                <ul className="p-0 m-0 list-unstyled">
                  {tags.map((tag) => {
                    return (
                      <li className=" border-0 p-2" key={tag}>
                        <Link
                          to={"/tag/" + tag}
                          className="text-decoration-none d-block text-secondary dropdown-item"
                        >
                          {tag}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Tags;
