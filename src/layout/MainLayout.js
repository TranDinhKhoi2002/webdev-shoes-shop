import { Outlet } from "react-router-dom";
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";

function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default MainLayout;
