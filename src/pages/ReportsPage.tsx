import { useTranslation } from 'react-i18next';
import Title from '../components/Title'

export default function ReportsPage() {
  const { t } = useTranslation();
  return (
    <>
    <Title>{t("reports")}</Title>
    <p>
      {t("reports_description")}
    </p>
    </>
  )
}
