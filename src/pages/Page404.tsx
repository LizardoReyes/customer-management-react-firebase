import { useTranslation } from "react-i18next";

export default function Page404() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">{t("title_404")}</h1>
      <p className="text-gray-600 mt-4">{t("message_404")}</p>
    </div>
  );
}
