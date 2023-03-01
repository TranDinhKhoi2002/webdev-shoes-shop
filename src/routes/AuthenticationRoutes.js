import AuthLayout from "@/layout/AuthLayout";
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
  ],
};

export default AuthenticationRoutes;
