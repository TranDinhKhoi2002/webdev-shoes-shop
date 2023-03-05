import { ToastContainer } from "react-toastify";
import Routes from "./routes";
import "react-toastify/dist/ReactToastify.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { fetchCurrentUser } from "./redux/slices/auth";
import { getCommonData } from "./redux/slices/data";
import { assignProductsToCart } from "./redux/slices/cart";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      const token = Cookies.get("token");
      if (token) {
        await dispatch(getCommonData()).unwrap();

        const { user } = await dispatch(fetchCurrentUser()).unwrap();
        if (user) {
          dispatch(assignProductsToCart({ cart: user.cart }));
        }
      }
    };

    getData();
  }, [dispatch]);

  return (
    <>
      <Routes />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
