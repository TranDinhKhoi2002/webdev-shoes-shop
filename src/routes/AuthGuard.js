import MainLayout from "@/layout/MainLayout";
import { selectCurrentUser } from "@/redux/slices/auth";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function AuthGuard() {
  const user = useSelector(selectCurrentUser);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role?.name !== "Admin" && location.pathname === "/admin/add-product" ) {
      navigate(-1);
    }
  }, [user?.role?.name, location.pathname, navigate]);

  return <MainLayout />;
}

export default AuthGuard;
