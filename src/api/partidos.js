import {
  getFirestore,
  collection,
  setDoc,
  doc,
  getDocs,
  deleteDoc,
} from "firebase/firestore/lite";
import { app } from "./main";

const db = getFirestore(app);

export const addPartido = async (data) => {
  const newPartido = {
    ...data,
    formato_fecha: new Date(data.fecha + " " + data.hora),
  };
  console.log(data.id);
  try {
    await setDoc(doc(db, "partidos", data.id.toString()), newPartido);
    alert("Se agregó el partido correctamente");
  } catch (e) {
    console.error("Error adding document: ", e);
    alert(e.message);
  }
};

export const getPartidos = async () => {
  const partidosCol = collection(db, "partidos");
  const partidosSnapshot = await getDocs(partidosCol);
  const partidosList = partidosSnapshot.docs.map((doc) => doc.data());
  return partidosList;
};

export const deletePartido = async (id) => {
  try {
    await deleteDoc(doc(db, "partidos", id.toString()));
    alert("Se borro correctamente el aprtido");
  } catch (error) {
    alert(`Hubo un error al borrar el partido: ${error}`);
  }
};
