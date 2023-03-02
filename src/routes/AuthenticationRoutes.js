import AuthLayout from "@/layout/AuthLayout";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import Product from "@/pages/Product";
import Bought from "@/pages/Bought";

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
      path: "/product",
      element: <Product />,
    },
    {
      path: "/bought",
      element: <Bought />,
    },
  ],
};

export default AuthenticationRoutes;
