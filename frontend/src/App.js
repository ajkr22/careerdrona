import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Latest from "./Pages/Latest";
import Home from "./Pages/Home";
import Top from "./Pages/Top";
import Blog from "./Pages/Blog";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import NewBlog from "./Pages/NewBlog";
import UserInfo from "./Pages/UserInfo";
import Dashboard from "./Pages/Dashboard";
import Profile from "./Pages/Profile";
import "./index.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Tag from "./Pages/Tag";
import EditBlog from "./Pages/EditBlog";
import Admin from "./Pages/Admin";
import Notification from "./Pages/Notification";
import Guidanceform from "./Pages/Guidanceform";

export const UserContext = React.createContext();

function App() {
  const [user, setUser] = useState(null);
  const getUser = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/auth/login/success`;
      const response = await axios.get(url, { withCredentials: true });
      setUser(response.data.user);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={user}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/latest" element={<Latest />} />
            <Route path="/top" element={<Top />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            {user && (
              <Route
                path="/new"
                element={
                  user === null || user === undefined ? (
                    <Navigate to="/" />
                  ) : (
                    <NewBlog />
                  )
                }
              />
            )}
            {user && (
              <Route
                path="/userinfo"
                element={
                  user === null || user === undefined ? (
                    <Navigate to="/" />
                  ) : (
                    <UserInfo />
                  )
                }
              />
            )}
            {user && (
              <Route
                path="/dashboard"
                element={
                  user === null || user === undefined ? (
                    <Navigate to="/" />
                  ) : (
                    <Dashboard />
                  )
                }
              />
            )}
            {user && (
              <Route
                path="/notification"
                element={
                  user === null || user === undefined ? (
                    <Navigate to="/" />
                  ) : (
                    <Notification />
                  )
                }
              />
            )}
            {user && (
              <Route
                path="/admin"
                element={
                  user === null || user === undefined || user.role === "" ? (
                    <Navigate to="/" />
                  ) : (
                    <Admin />
                  )
                }
              />
            )}
             {user && (
              <Route
                path="/guidanceform"
                element={
                  user === null || user === undefined || user.role === "" ? (
                    <Navigate to="/" />
                  ) : (
                    <Guidanceform />
                  )
                }
              />
            )}
            <Route path="/:username" element={<Profile />} />
            <Route path="/tag/:tag" element={<Tag />} />
            <Route path="/:username/:title" element={<Blog />} />
            {user && (
              <Route
                path="/edit/:postid"
                element={
                  user === null || user === undefined ? (
                    <Navigate to="/" />
                  ) : (
                    <EditBlog />
                  )
                }
              />
            )}
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
