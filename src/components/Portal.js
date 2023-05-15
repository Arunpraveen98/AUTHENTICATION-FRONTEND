import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../context/Context";
import Header from "./Header";
import { posts } from "../data.js";
import Card from "./Card";
import { URL } from "../config";
import { toast } from "react-toastify";
// -----------------
const Portal = () => {
  // -----------------
  const { loginData, setLoginData } = useContext(LoginContext);
  const navigate = useNavigate();
  // -----------------
  const logoutUser = () => {
    localStorage.removeItem("AuthToken");
    window.open(`${URL}/auth/logout`, "_self");
    toast.success("Successfully logged out", { autoClose: 2000 });
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };
  // -----------------
  const dashboardValid = async () => {
    let token = localStorage.getItem("AuthToken");
    const user = await axios.get(`${URL}/users/validUser`, {
      headers: {
        Authorization: token,
      },
    });

    setLoginData(user.data);
    // console.log(user.data);
  };
  // -----------------
  useEffect(() => {
    dashboardValid();
  }, []);
  // -----------------
  return (
    <div>
      <Header logoutUser={logoutUser} />
      <div className="home">
        {posts.map((post) => (
          <Card key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};
// -----------------
export default Portal;
// -----------------
