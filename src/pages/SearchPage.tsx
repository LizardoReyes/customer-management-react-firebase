import { useParams } from "react-router-dom";
import Title from "../components/Title";
import { useEffect, useState } from "react";
import { searchCustomersByName } from "../firebase/firestore";
import CustomerTable from "../components/CustomerTable";
import type { Customer } from "../types";
import { useTranslation } from "react-i18next";

const SearchPage = () => {
  const params = useParams();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    async function fetchData() {
      try {
        const customers = await searchCustomersByName(params.name || "");
        setCustomers(customers);
      } catch (error) {
        console.error("Error searching customers:", error);
      }
    }
    fetchData();
  }, [params.name]);

  return (
    <>
      <Title>{t("title_search", { query: params.name })}</Title>
      <CustomerTable customers={customers} />
    </>
  );
};

export default SearchPage;
