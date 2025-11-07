import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidedar";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";
import { useCustomerStore } from "../store/store";
import { useEffect } from "react";

export default function RootLayout() {
  const { initAuthListener, user } = useCustomerStore();
  const navigate = useNavigate();

  useEffect(() => {
    initAuthListener();
  }, [initAuthListener]);

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
