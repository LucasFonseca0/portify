import React from "react";
import { LoginForm } from "../../components/loginForm/LoginForm.tsx";

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-[100vh] bg-[#f3f4f6] flex items-center justify-center">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
