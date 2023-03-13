import React, { useContext } from "react";
import { UserContext } from "../App";
import Footer from "../Components/Footer";
import Nav from "../Components/Nav";
import Relevant from "./Relevant";

const Home = () => {
  return (
    <>
      <Nav />
      <Relevant />
      <Footer />
    </>
  );
};
export default Home;
