import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
  deleteDoc
} from "firebase/firestore/lite";
import { app } from "./main";
import { getResultaoById } from "./resultados";

const db = getFirestore(app);

export const getAllEquipos = async () => {
  const equiposCol = collection(db, "equipos");
  const equiposSnapshot = await getDocs(equiposCol);
  const equiposList = equiposSnapshot.docs.map((doc) => doc.data());
  return equiposList;
};

export const addEquipo = async (data) => {
  console.log(data.id);
  try {
    await setDoc(doc(db, "equipos", data.id.toString()), data);
    alert("Se agregó el equipo correctamente. ");
  } catch (e) {
    alert(`Error guardando el equipo: ${e}` );
  }
};

export const getEquipo = async (id) => {
  const docRef = doc(db, "equipos", id.toString());
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return alert("No se encontró ningún equipo");
  }
};

export const deleteEquipo = async (equipoId) => {
  try {
      const docRef = doc(db, "equipos", equipoId.toString());
      await deleteDoc(docRef)
      alert("El equipo se eliminó correctamente")
  } catch (error) {
    alert(error)
  }
}


export const updateEquipos = async (resultado, isEditing) => {
  if(isEditing){
    await revertirPuntos(resultado)
  } 

  if (parseInt(resultado.puntos_local) > parseInt(resultado.puntos_visitante)) {
    await seteoPuntos(resultado.equipo_local_id, resultado.equipo_visitante_id, resultado);
  } else {
    await seteoPuntos(resultado.equipo_visitante_id, resultado.equipo_local_id, resultado);
  }
  
};

const seteoPuntos = async (ganador, perdedor, resultado) => {
  const puntos_local = parseInt(resultado.puntos_local);
  const puntos_visitante = parseInt(resultado.puntos_visitante);
  const puntos_ganador =
    puntos_local > puntos_visitante ? puntos_local : puntos_visitante;
  const puntos_perdedor =
    puntos_local < puntos_visitante ? puntos_local : puntos_visitante;

    const newPuntosLocal = await getEquipo(ganador)
    newPuntosLocal.puntos = newPuntosLocal.puntos + 2;
    newPuntosLocal.puntos_favor = newPuntosLocal.puntos_favor + parseInt(puntos_ganador);
    newPuntosLocal.puntos_contra =
    newPuntosLocal.puntos_contra + parseInt(puntos_perdedor);
    newPuntosLocal.partidos_ganados = newPuntosLocal.partidos_ganados + 1;
    await setDoc(doc(db, "equipos", newPuntosLocal.id.toString()), newPuntosLocal);


    const newPuntosVisitante = await getEquipo(perdedor)
    newPuntosVisitante.puntos = newPuntosVisitante.puntos + 1;
    newPuntosVisitante.puntos_favor = newPuntosVisitante.puntos_favor + parseInt(puntos_perdedor);
    newPuntosVisitante.puntos_contra = newPuntosVisitante.puntos_contra + parseInt(puntos_ganador);
    newPuntosVisitante.partidos_perdidos = newPuntosVisitante.partidos_perdidos + 1;
    await setDoc(doc(db, "equipos", newPuntosVisitante.id.toString()), newPuntosVisitante);

};

const revertirPuntos = async (resultado) => {
  const resultadoAnterior = await getResultaoById(resultado.id);

  const puntos_local = parseInt(resultadoAnterior.puntos_local);
  const puntos_visitante = parseInt(resultadoAnterior.puntos_visitante);
  const puntos_ganador =
    puntos_local > puntos_visitante ? puntos_local : puntos_visitante;
  const puntos_perdedor =
    puntos_local < puntos_visitante ? puntos_local : puntos_visitante;

    let ganadorAnteriorId
    let perdedorAnteriorId

    if (parseInt(resultadoAnterior.puntos_local) > parseInt(resultadoAnterior.puntos_visitante)) {
      ganadorAnteriorId = resultadoAnterior.equipo_local_id
      perdedorAnteriorId = resultadoAnterior.equipo_visitante_id
    } else {
      ganadorAnteriorId = resultadoAnterior.equipo_visitante_id
      perdedorAnteriorId = resultadoAnterior.equipo_local_id
    }

    const equipoGanadorAnterior = await getEquipo(ganadorAnteriorId)
    const newPuntosGanador = equipoGanadorAnterior;
    newPuntosGanador.puntos = equipoGanadorAnterior.puntos - 2;
    newPuntosGanador.puntos_favor = equipoGanadorAnterior.puntos_favor - parseInt(puntos_ganador);
    newPuntosGanador.puntos_contra =
    equipoGanadorAnterior.puntos_contra - parseInt(puntos_perdedor);
    newPuntosGanador.partidos_ganados = equipoGanadorAnterior.partidos_ganados - 1;
    newPuntosGanador.partidos_perdidos = equipoGanadorAnterior.partidos_perdidos;
    await setDoc(doc(db, "equipos", equipoGanadorAnterior.id.toString()), newPuntosGanador);

    const equipoPerdedorAnterior = await getEquipo(perdedorAnteriorId)
    const newPuntosPerdedor = equipoPerdedorAnterior;
    newPuntosPerdedor.puntos = equipoPerdedorAnterior.puntos - 1;
    newPuntosPerdedor.puntos_favor = equipoPerdedorAnterior.puntos_favor - parseInt(puntos_perdedor);
    newPuntosPerdedor.puntos_contra = equipoPerdedorAnterior.puntos_contra - parseInt(puntos_ganador);
    newPuntosPerdedor.partidos_ganados = equipoPerdedorAnterior.partidos_ganados;
    newPuntosPerdedor.partidos_perdidos = equipoPerdedorAnterior.partidos_perdidos - 1;
    await setDoc(doc(db, "equipos", equipoPerdedorAnterior.id.toString()), newPuntosPerdedor);
  }
