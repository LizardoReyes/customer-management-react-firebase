import { useTranslation } from "react-i18next";
import Title from "../components/Title";

export default function ConfigurationPage() {
  const { t } = useTranslation();

  return (
    <>
      <Title>{t("configuration_page_title")}</Title>
      <p>{t("configuration_description")}</p>
    </>
  );
}
