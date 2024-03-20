import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc, 
  deleteDoc,
  setDoc
} from "firebase/firestore/lite";
import { app } from "./main";

const db = getFirestore(app);

export const addResultado = async (data) => {
  try {
    await setDoc(doc(db, "resultados", data.id.toString()), data);
    alert("Se agregó el resultado correctamente");
  } catch (e) {
    alert(`Error al agregar el resultado: ${e}`);
    alert(e.message);
  }
};

export const getResultados = async () => {
  const resultadosCol = collection(db, "resultados");
  const resultadosSnapshot = await getDocs(resultadosCol);
  const resultadosList = resultadosSnapshot.docs.map((doc) => doc.data());
  return resultadosList;
};

export const getResultaoById = async (resultadoId) => {
  const docRef = doc(db, "resultados", resultadoId.toString());
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return alert("No se encontró ningún equipo");
  }
}

export const deleteResultado = async (resultadoId) => {
  try {
      const docRef = doc(db, "resultados", resultadoId.toString());
      await deleteDoc(docRef)
      alert("El resultado se eliminó correctamente")
  } catch (error) {
    alert(`Hubo un error al eliminar el resultado: ${error}`)
  }
}
