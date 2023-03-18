import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { app } from "./main";

const db = getFirestore(app);

export const loginData = async () => {
  const usuariosCol = collection(db, "usuarios");
  const usuariosSnapshot = await getDocs(usuariosCol);
  const usuariosList = usuariosSnapshot.docs.map((doc) => doc.data());
  return usuariosList[0];
};
