import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore/lite";
import { app } from "./main";

const db = getFirestore(app);

export const addResultado = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "resultados"), data);
    console.log("Document written with ID: ", docRef.id);
    alert("Se agregó el resultado correctamente");
  } catch (e) {
    console.error("Error adding document: ", e);
    alert(e.message);
  }
};

export const getResultados = async () => {
  const resultadosCol = collection(db, "resultados");
  const resultadosSnapshot = await getDocs(resultadosCol);
  const resultadosList = resultadosSnapshot.docs.map((doc) => doc.data());
  return resultadosList;
};
