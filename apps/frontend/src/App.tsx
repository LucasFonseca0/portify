import React from "react";
import LoginPage from "./pages/loginPage/LoginPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  return (
    <>
      <ToastContainer position="top-right" theme="colored" autoClose={3000} />
      <LoginPage />
    </>
  );
};

export default App;
