import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../db"

export function hasEmptyValue(userDataWithoutPasswords) {
  for (let key in userDataWithoutPasswords) {
    if (userDataWithoutPasswords.hasOwnProperty(key) && userDataWithoutPasswords[key] === "") {
      return true;
    }
  }
  return false;
}

export async function deleteVehicleById(vehId) {
  const bidsQuery = query(collection(db, "bids"), where("vehicleId", "==", vehId));

  const querySnapshot = await getDocs(bidsQuery);
  if (!querySnapshot.empty) {
    querySnapshot.forEach(async (docSnapshot) => {
      await deleteDoc(doc(db, "bids", docSnapshot.id));
    });
    console.log(`Bids with vehicleId ${vehId} deleted.`);
  } else {
    console.log(`No bids found with vehicleId ${vehId}.`);
  }
}