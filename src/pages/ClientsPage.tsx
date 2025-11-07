import { useEffect } from "react";
import AddCustomerModal from "../components/AddCustomerModal";
import CustomerTable from "../components/CustomerTable";
import { subscribeToCustomers } from "../firebase/firestore";
import { useCustomerStore } from "../store/store";
import Title from "../components/Title";
import { useTranslation } from "react-i18next";

export default function ClientsScreen() {
  const { showModal, setCustomers, customers } = useCustomerStore();
  const { t } = useTranslation();

  useEffect(() => {
    const unsubscribe = subscribeToCustomers(setCustomers);
    return () => unsubscribe(); // Clean up the listener on unmount
  }, [setCustomers]);

  return (
    <>
      <Title>{t("clients_page_title")}</Title>
      {customers.length === 0 ? (
        <p className="text-gray-600">{t("clients_empty_message")}</p>
      ) : (
        <CustomerTable customers={customers} />
      )}

      {showModal && <AddCustomerModal />}
    </>
  );
}
