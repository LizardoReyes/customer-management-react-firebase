import type { FormEvent } from "react";
import { addCustomer, updateCustomerById } from "../services/CustomerServices";
import { toast } from "react-toastify";
import { useCustomerStore } from "../store/store";
import type { Customer } from "../types";
import { useTranslation } from "react-i18next";

export default function AddCustomerModal() {
  const { setShowModal, activeCustomer, setActiveCustomer } =
    useCustomerStore();
  const { t } = useTranslation();

  const onSubmit = async (
    event: FormEvent<HTMLFormElement>,
    setShowModal: (show: boolean) => void,
    activeCustomer: Customer | null,
    setActiveCustomer: (customer: null) => void
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    if (Object.values(data).includes("")) {
      toast.error(t("all_fields_required"));
      return;
    }

    try {
      if (activeCustomer) {
        await updateCustomerById(activeCustomer.id, data);
        toast.success(t("customer_updated_success"));
        return;
      }

      await addCustomer(data);
      toast.success(t("customer_added_success"));
    } catch (error) {
      console.log("Error adding customer: " + (error as Error).message);
      toast.error(t("failed_to_add_customer"));
      return;
    } finally {
      setShowModal(false);
      setActiveCustomer(null);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add Client</h2>
        <form
          className="space-y-3"
          onSubmit={(event) =>
            onSubmit(event, setShowModal, activeCustomer, setActiveCustomer)
          }
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full border rounded px-3 py-2"
            defaultValue={activeCustomer?.name}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border rounded px-3 py-2"
            defaultValue={activeCustomer?.email}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            className="w-full border rounded px-3 py-2"
            defaultValue={activeCustomer?.phone}
          />
          <input
            type="text"
            name="address"
            placeholder="Direction"
            className="w-full border rounded px-3 py-2"
            defaultValue={activeCustomer?.address}
          />
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100 cursor-pointer"
            >
              {t("cancel")}
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
            >
              {t("save")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
