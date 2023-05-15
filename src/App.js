import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Portal from "./components/Portal";
import ForgotPassword from "./components/ForgotPassword";
import PasswordReset from "./components/PasswordReset";
import { LoginContext } from "./context/Context";
import { useContext, useEffect } from "react";
import { URL } from "./config";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// -----------------
function App() {
  const { loginData, setLoginData } = useContext(LoginContext);
  // -----------------
  useEffect(() => {
    const getUser = () => {
      fetch(`${URL}/auth/login/success`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setLoginData(resObject.user);
          // console.log(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);
  // -----------------
  return (
    <div className="container">
      <ToastContainer
        position="top-center"
        autoClose={true}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<Portal />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:id/:token" element={<PasswordReset />} />
      </Routes>
    </div>
  );
}
// -----------------
export default App;
// -----------------
