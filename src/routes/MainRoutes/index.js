import AuthGuard from "../AuthGuard";
import CommonRoutes from "./CommonRoute";

const MainRoutes = {
  path: "/",
  element: <AuthGuard />,
  children: CommonRoutes,
};

export default MainRoutes;
