import { toast } from "react-toastify";
import { deleteCustomerById } from "../services/CustomerServices";
import { useCustomerStore } from "../store/store";
import type { Customer } from "../types";
import { useTranslation } from "react-i18next";

type CustomerTableProps = {
  customers: Customer[];
};

export default function CustomerTable({ customers }: CustomerTableProps) {
  const { setShowModal, setActiveCustomer } = useCustomerStore();
  const { t } = useTranslation();

  const handleEdit = (customer: Customer) => {
    try {
      setActiveCustomer(customer);
      setShowModal(true);
    } catch (error) {
      console.log("Error setting active customer: " + (error as Error).message);
      toast.error(t("failed_to_edit_customer"));
    }
  };

  const handleDelete = async (id: Customer["id"]) => {
    if (!confirm(t("message_confirm_delete"))) return;

    try {
      await deleteCustomerById(id);
      toast.success(t("customer_deleted_success"));
    } catch (error) {
      console.log("Error deleting customer: " + (error as Error).message);
      toast.error(t("failed_to_delete_customer"));
    }
  };

  return (
    <table className="min-w-full bg-white border rounded-lg shadow-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="text-left px-4 py-2">{t("name")}</th>
          <th className="text-left px-4 py-2">{t("email")}</th>
          <th className="text-left px-4 py-2">{t("phone")}</th>
          <th className="text-left px-4 py-2">{t("address")}</th>
          <th className="px-4 py-2 text-right">{t("actions")}</th>
        </tr>
      </thead>
      <tbody>
        {customers.length === 0 ? (
          <tr>
            <td colSpan={5} className="text-center px-4 py-2">
              {t("customers_empty_message")}
            </td>
          </tr>
        ) : (
          customers.map((customer) => (
            <tr key={customer.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{customer.name}</td>
              <td className="px-4 py-2">{customer.email}</td>
              <td className="px-4 py-2">{customer.phone}</td>
              <td className="px-4 py-2">{customer.address}</td>
              <td className="px-4 py-2 text-right">
                <button
                  className="text-blue-600 hover:underline mr-2 cursor-pointer"
                  onClick={() => handleEdit(customer)}
                >
                  {t("edit")}
                </button>
                <button
                  className="text-red-600 hover:underline cursor-pointer"
                  onClick={() => handleDelete(customer.id)}
                >
                  {t("delete")}
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
