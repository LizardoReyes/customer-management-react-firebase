import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  endAt,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  startAt,
  updateDoc,
} from "firebase/firestore";
import { app } from "./config";
import type { Customer, DraftCustomer } from "../types";

const db = getFirestore(app);

// Suscripción en tiempo real a los clientes
export const subscribeToCustomers = (
  callback: (customers: Customer[]) => void
) => {
  const colRef = collection(db, "customers");

  const unsubscribe = onSnapshot(colRef, (snapshot) => {
    const customers = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Customer[];
    callback(customers);
  });

  return unsubscribe; // permite cancelar la suscripción
};

// Agregar cliente
export const createCustomer = async (customer: DraftCustomer) => {
  await addDoc(collection(db, "customers"), customer);
};

// Actualizar cliente
export const updateCustomer = async (
  id: string,
  customer: Partial<Customer>
) => {
  const ref = doc(db, "customers", id);
  await updateDoc(ref, customer);
};

// Obtener cliente por ID (una sola vez)
export const getCustomerById = async (id: string) => {
  const snapshot = await getDoc(doc(db, "customers", id));
  if (snapshot.exists()) {
    return snapshot.data() as Customer;
  }
  return null;
};

// Eliminar cliente
export const deleteCustomer = async (id: string) => {
  await deleteDoc(doc(db, "customers", id));
};

// 🔎 Buscar clientes por coincidencia de prefijo en el nombre
export const searchCustomersByName = async (name: string) => {
  const colRef = collection(db, "customers");
  const q = query(
    colRef,
    orderBy("name"),
    startAt(name),
    endAt(name + "\uf8ff") // 🔹 busca todo lo que empiece con "name"
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Customer[];
};
