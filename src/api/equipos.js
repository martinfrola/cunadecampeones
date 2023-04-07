import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
} from "firebase/firestore/lite";
import { app } from "./main";

const db = getFirestore(app);

export const equiposData = async () => {
  const equiposCol = collection(db, "equipos");
  const equiposSnapshot = await getDocs(equiposCol);
  const equiposList = equiposSnapshot.docs.map((doc) => doc.data());
  return equiposList;
};

export const addEquipo = async (data) => {
  console.log(data.id);
  try {
    const docRef = await setDoc(doc(db, "equipos", data.name), data);
    console.log("Document written with ID: ", docRef.id);
    alert("Se agregó el equipo correctamente");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getEquipo = async (name) => {
  const docRef = doc(db, "equipos", name);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return alert("No se encontró ningún equipo");
  }
};

export const updateEquipos = async (resultado) => {
  if (parseInt(resultado.puntos_local) > parseInt(resultado.puntos_visitante)) {
    seteoPuntos(resultado.equipo_local, resultado.equipo_visitante, resultado);
  } else {
    seteoPuntos(resultado.equipo_visitante, resultado.equipo_local, resultado);
  }
};

const seteoPuntos = (ganador, perdedor, resultado) => {
  parseInt(resultado.puntos_local);
  parseInt(resultado.puntos_visitante);
  const puntos_ganador =
    resultado.puntos_local > resultado.puntos_visitante
      ? resultado.puntos_local
      : resultado.puntos_visitante;
  const puntos_perdedor =
    resultado.puntos_local < resultado.puntos_visitante
      ? resultado.puntos_local
      : resultado.puntos_visitante;
  getEquipo(ganador).then((res) => {
    const newPuntosLocal = res;
    newPuntosLocal.puntos = res.puntos + 2;
    newPuntosLocal.puntos_favor = res.puntos_favor + parseInt(puntos_ganador);
    newPuntosLocal.puntos_contra =
      res.puntos_contra + parseInt(puntos_perdedor);
    newPuntosLocal.partidos_ganados = res.partidos_ganados + 1;
    newPuntosLocal.partidos_perdidos = res.partidos_perdidos;
    setDoc(doc(db, "equipos", res.name), newPuntosLocal);
  });
  getEquipo(perdedor).then((res) => {
    const newPuntosLocal = res;
    newPuntosLocal.puntos = res.puntos + 1;
    newPuntosLocal.puntos_favor = res.puntos_favor + parseInt(puntos_perdedor);
    newPuntosLocal.puntos_contra = res.puntos_contra + parseInt(puntos_ganador);
    newPuntosLocal.partidos_ganados = res.partidos_ganados;
    newPuntosLocal.partidos_perdidos = res.partidos_perdidos + 1;
    setDoc(doc(db, "equipos", res.name), newPuntosLocal);
  });
};
