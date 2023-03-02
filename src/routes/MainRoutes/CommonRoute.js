import Cart from "@/pages/Cart";
import Home from "@/pages/Home";
import Product from "@/pages/Product";
import Bought from "@/pages/History";

const CommonRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/product",
    element: <Product />,
  },
  {
    path: "/history",
    element: <Bought />,
  },
];

export default CommonRoutes;
