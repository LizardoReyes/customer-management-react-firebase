import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, type User } from "firebase/auth";
import { app } from "./config";

export const auth = getAuth(app);

export function getCurrentUser() {
  return auth.currentUser;
}

export const registerWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const logout = async () => {
  await auth.signOut();
}

export const loginWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const watchAuth = (callback: (user: User | null) => void) => onAuthStateChanged(auth, callback);
