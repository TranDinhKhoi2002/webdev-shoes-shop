import Cart from "@/pages/Cart";
import Home from "@/pages/Home";
import Product from "@/pages/ProductInfor";
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
    path: "/products/:productId",
    element: <Product />,
  },
  {
    path: "/history",
    element: <Bought />,
  },
];

export default CommonRoutes;
