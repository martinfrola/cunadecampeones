import {
    getFirestore,
    collection,
    getDocs,
    setDoc,
    doc,
  } from "firebase/firestore/lite";
  import { app } from "./main";

  const db = getFirestore(app);

  export const getPointsConfig= async () => {
    const pointsConfig = collection(db, "pointsConfig");
    const pointsConfigSnapshot = await getDocs(pointsConfig);
    const pointsConfigSnapshotList = pointsConfigSnapshot.docs.map((doc) => doc.data());
    return pointsConfigSnapshotList;
  };

  export const addPointsConfig = async (data) => {
    try {
        // Usar forEach para iterar sobre cada objeto en el array y guardarlos en Firebase
        data.forEach(async (obj) => {
            await setDoc(doc(db, "pointsConfig", obj.category), obj);
        });
        alert("Se guardaron los datos correctamnte")
    } catch (error) {
        alert(`Hubo un error al guardar los datos. Error: ${error}`)
    }
  }