import AuthLayout from "@/layout/AuthLayout";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

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
      element: <Register />,
    },
  ],
};

export default AuthenticationRoutes;
