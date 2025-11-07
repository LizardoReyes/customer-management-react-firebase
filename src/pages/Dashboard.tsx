import { useTranslation } from "react-i18next";
import Title from "../components/Title";

export default function Dashboard() {
  const { t } = useTranslation();

  return (
    <>
      <Title>{t("dashboard")}</Title>
      <p>{t("welcome_message")}</p>
    </>
  );
}
