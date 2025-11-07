import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const { t } = useTranslation();

  return (
    <aside className="w-64 bg-white border-r shadow-sm p-4 hidden md:flex flex-col">
      <h2 className="text-xl font-bold text-blue-600 mb-6">CRM Dashboard</h2>
      <nav className="space-y-2">
        <Link
          to="/dashboard"
          className="block p-2 rounded hover:bg-blue-50 text-gray-700"
        >
          {t("dashboard")}
        </Link>
        <Link
          to="/dashboard/clients"
          className="block p-2 rounded hover:bg-blue-50 text-gray-700"
        >
          {t("clients")}
        </Link>
        <Link
          to="/dashboard/reports"
          className="block p-2 rounded hover:bg-blue-50 text-gray-700"
        >
          {t("reports")}
        </Link>
        <Link
          to="/dashboard/configuration"
          className="block p-2 rounded hover:bg-blue-50 text-gray-700"
        >
          {t("configuration")}
        </Link>
      </nav>
    </aside>
  );
}
