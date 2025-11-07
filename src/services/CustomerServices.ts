import { safeParse } from "zod";
import {
  CustomerSchema,
  DraftCustomerSchema,
  SearchCustomerSchema,
  type Customer,
} from "../types";
import {
  createCustomer,
  deleteCustomer,
  searchCustomersByName,
  updateCustomer,
} from "../firebase/firestore";

type CustomerData = {
  [key: string]: FormDataEntryValue;
};

export async function addCustomer(customer: CustomerData) {
  try {
    const result = safeParse(DraftCustomerSchema, customer);

    if (!result.success) {
      throw new Error("Invalid customer data: " + result.error.message);
    }

    await createCustomer(result.data);
  } catch (error) {
    throw new Error("Failed to add customer: " + (error as Error).message);
  }
}

export async function updateCustomerById(
  id: Customer["id"],
  customer: Partial<Customer>
) {
  try {
    const result = safeParse(CustomerSchema.partial(), customer);

    if (!result.success) {
      throw new Error("Invalid customer data: " + result.error.message);
    }

    await updateCustomer(id, result.data);
  } catch (error) {
    throw new Error("Failed to update customer: " + (error as Error).message);
  }
}

export async function deleteCustomerById(id: Customer["id"]) {
  try {
    await deleteCustomer(id);
  } catch (error) {
    throw new Error("Failed to delete customer: " + (error as Error).message);
  }
}

export async function findCustomersByName(name: string) {
  try {
    const result = safeParse(SearchCustomerSchema, { name });

    if (!result.success) {
      throw new Error("Invalid search criteria: " + result.error.message);
    }

    return await searchCustomersByName(name);
  } catch (error) {
    throw new Error("Failed to find customers: " + (error as Error).message);
  }
}
