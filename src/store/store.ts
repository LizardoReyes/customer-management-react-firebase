import { create } from "zustand";
import { createCustomerSlice, type CustomerSlice } from "./customerSlice";
import { createUserSlice, type UserSlice } from "./userSlice";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

type CustomerState = CustomerSlice & UserSlice;

export const useCustomerStore = create<CustomerState>()(
  devtools(
    persist(
      (...a) => ({
        ...createCustomerSlice(...a),
        ...createUserSlice(...a),
      }),
      {
        name: "customer-management-store",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
