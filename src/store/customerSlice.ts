import { type StateCreator } from "zustand";
import { type Language, type Customer, SupportedLangs } from "../types";

export interface CustomerSlice {
  customers: Customer[];
  showModal: boolean;
  lang: Language;
  setLang: (lang: Language) => void;
  setCustomers: (customers: Customer[]) => void;
  setShowModal: (show: boolean) => void;
  activeCustomer: Customer | null;
  setActiveCustomer: (customer: Customer | null) => void;
}

export const createCustomerSlice: StateCreator<CustomerSlice> = (set) => ({
  customers: [],
  showModal: false,
  lang: SupportedLangs.EN,
  setLang: (lang: Language) => set({ lang }),
  setCustomers: (customers: Customer[]) => set({ customers }),
  setShowModal: (show: boolean) => set({ showModal: show }),
  activeCustomer: null,
  setActiveCustomer: (customer: Customer | null) =>
    set({ activeCustomer: customer }),
});
