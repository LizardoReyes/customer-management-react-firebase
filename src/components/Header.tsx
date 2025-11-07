import { toast } from "react-toastify";
import { useCustomerStore } from "../store/store";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { logout } from "../firebase/auth";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { setShowModal, user } = useCustomerStore();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
  const initials = user?.email?.slice(0, 2).toUpperCase() ?? "";
  const { t } = useTranslation();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    setOpen(false);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const search = formData.get("search") as string;

      if (!search) {
        toast.info(t("search_term_empty"));
        return;
      }

      // redirect to search page
      navigate(`/dashboard/clients/search/${encodeURIComponent(search)}`);
      // reset form
      e.currentTarget.reset();
    } catch (error) {
      console.error("Error searching customers:", error);
      toast.error(t("error_searching_customers"));
    }
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-sm border-b">
      <div className="flex items-center gap-4">
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="search"
            placeholder={t("search_placeholder")}
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mx-2 cursor-pointer">
            {t("search")}
          </button>
        </form>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
        >
          {t("new_client")}
        </button>
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setOpen(!open)}
            className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-300 transition"
          >
            {initials}
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-40 rounded-xl bg-white shadow-lg border border-gray-100 py-2 z-50">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
              >
                {t("logout")}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
