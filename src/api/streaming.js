import {
    getFirestore,
    collection,
    getDocs,
    setDoc,
    doc,
  } from "firebase/firestore/lite";
  import { app } from "./main";

  const db = getFirestore(app);

  export const getStreamingData = async () => {
    const streamingData = collection(db, "streamingData");
    const streamingDataSnapshot = await getDocs(streamingData);
    const streamingDataSnapshotList = streamingDataSnapshot.docs.map((doc) => doc.data());
    return streamingDataSnapshotList;
  };

  export const addStreamingData = async (data) => {
    try {
        // Usar forEach para iterar sobre cada objeto en el array y guardarlos en Firebase
        data.forEach(async (obj) => {
            await setDoc(doc(db, "streamingData", obj.cancha), obj);
        });
        alert("Se guardaron los datos correctamnte")
    } catch (error) {
        alert(`Hubo un error al guardar los datos. Error: ${error}`)
    }
  }