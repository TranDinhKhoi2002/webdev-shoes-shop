import AuthLayout from "@/layout/AuthLayout";
import ForgotPassword from "@/pages/ForgotPassword";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";

const AuthenticationRoutes = {
  path: "/",
  element: <AuthLayout />,
  children: [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/reset-password/:token",
      element: <ForgotPassword />,
    },
  ],
};

export default AuthenticationRoutes;
