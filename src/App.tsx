import { Link } from "react-router-dom";
import Title from "./components/Title";
import { useTranslation } from "react-i18next";

export default function App() {
  const { t } = useTranslation();
  
  return (
    <div className="flex flex-col h-screen items-center justify-center bg-gray-100">
      <Title>{t("welcome_message")}</Title>
      <div className="text-center">
        <Link to="/login" className="mt-4 text-blue-600 hover:underline">
          {t("go_login")}
        </Link>
        <Link to="/register" className="ml-4 mt-4 text-blue-600 hover:underline">
          {t("go_register")}
        </Link>
      </div>
    </div>
  );
}
