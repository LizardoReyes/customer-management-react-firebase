import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useCustomerStore } from "../store/store";
import { toast, ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { login, loading, error, initAuthListener, user } = useCustomerStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    initAuthListener();
  }, [initAuthListener]);

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      await login(email, password);
      toast.success(t("login_success"));
      navigate("/dashboard");
    } catch (error) {
      toast.error(t("login_failure"));
      console.error("Error during login:", error);
    }
  };

  if (user) {
    navigate("/dashboard");
    return null;
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
          {t("login_page_title")}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              {t("email")}
            </label>
            <input
              type="email"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              {t("password")}
            </label>
            <input
              type="password"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-2 text-white hover:bg-blue-700 transition"
          >
            {loading ? t("login_loading") : t("login")}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          {t("dont_have_account")}{" "}
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:underline"
          >
            {t("registered")}
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}
