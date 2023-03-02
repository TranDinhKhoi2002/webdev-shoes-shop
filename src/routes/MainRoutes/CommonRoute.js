import Cart from "@/pages/Cart";
import Home from "@/pages/Home";

const CommonRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
];

export default CommonRoutes;
