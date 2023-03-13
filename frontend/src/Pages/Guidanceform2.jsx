import React from "react";

const Guidanceform = () => {
  // const [user, setUser] = {
  //   firstname: "",
  //   lastname: "",
  //   phoneno: "",
  //   email: "",
  //   domain: "",
  //   question: "",
  // };

  // let name, value;
  // const handleChange = (e) => {
  //   console.log(e);
  //   name = e.target.name;
  //   value = e.target.value;

  //   setUser({ ...user, [name]: value });
  // };

  return (
    <>
      <div className="container">
        <form>
          <div className="row">
            <div className="form-group">
              <label for="exampleFormControlInput1">First Name</label>
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="Type your first name here"
                // value={user.firstname}
                // onChange={handleChange}
              />
            </div>
          </div>

          <div class="form-group">
            <label for="exampleFormControlInput1">Last Name</label>
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Type your last name here"
              // value={user.lastname}
              // onChange={handleChange}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Email Address</label>
            <input
              type="email"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="name@gmail.com"
              // value={user.email}
              // onChange={handleChange}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Phone Number</label>
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="name@gmail.com"
              // value={user.phoneno}
              // onChange={handleChange}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">Select the domain</label>
            <select
              class="form-control"
              id="exampleFormControlSelect1"
              // value={user.domain}
              // onChange={handleChange}
            >
              <option value="" selected>
                Please select a domain
              </option>
              <option>1.CLASS 9th AND 10th</option>
              <option>2.IITJEE AND MAINS</option>
              <option>3.GATE OR ESE</option>
              <option>4.IT AND PLACEMENT</option>
              <option>5.OTHER</option>
            </select>
          </div>

          <div class="form-group">
            <label for="exampleFormControlTextarea1">
              Write your question below
            </label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              // value={user.question}
              // onChange={handleChange}
            ></textarea>
          </div>
        </form>
      </div>
    </>
  );
};

export default Guidanceform;
