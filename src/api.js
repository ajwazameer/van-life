import { initializeApp } from "firebase/app";
import {
  getFirestore,
  getDocs,
  collection,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore/lite";
const firebaseConfig = {
  apiKey: "AIzaSyBBLgqX0yLQlXdqxgEqH1X8PBK3awZEqhU",
  authDomain: "vanlife-1923f.firebaseapp.com",
  projectId: "vanlife-1923f",
  storageBucket: "vanlife-1923f.firebasestorage.app",
  messagingSenderId: "199926702874",
  appId: "1:199926702874:web:f8bc3bfd19f8755740c2a3",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const vansCollectionRef = collection(db, "vans");

export async function getVans() {
  const querySnapshot = await getDocs(vansCollectionRef);
  const dataArr = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
  }));
  return dataArr;
}
export async function getVan(id) {
  const docRef = doc(db, "vans", id);
  const querySnapshot = await getDoc(docRef);
  return {
    ...querySnapshot.data(),
  };
}
export async function getHostVans() {
  const q = query(vansCollectionRef, where("hostId", "==", "123"));
  const querySnapshot = await getDocs(q);
  const dataArr = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
  }));
  return dataArr;
}

// export async function getVans(id) {
//   const response = id
//     ? await fetch(`/api/vans/${id}`)
//     : await fetch("/api/vans");
//   if (!response.ok) {
//     throw {
//       message: "Failed to fetch vans",
//       statusText: res.statusText,
//       status: res.status,
//     };
//   }
//   const data = await response.json();
//   return data.vans;
// }
// export async function getHostVans(id) {
//   const response = id
//     ? await fetch(`/api/host/vans/${id}`)
//     : await fetch("/api/host/vans");
//   if (!response.ok) {
//     throw {
//       message: "Failed to fetch vans",
//       statusText: res.statusText,
//       status: res.status,
//     };
//   }
//   const data = await response.json();
//   return data.vans;
// }
export async function loginUser(creds) {
  const res = await fetch("/api/login", {
    method: "post",
    body: JSON.stringify(creds),
  });
  const data = await res.json();

  if (!res.ok) {
    throw {
      message: data.message,
      statusText: res.statusText,
      status: res.status,
    };
  }

  return data;
}
