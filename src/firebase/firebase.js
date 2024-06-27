import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  getBytes,
} from "firebase/storage";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  setDoc,
  where,
  deleteDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINSENDERID,
  appId: import.meta.env.VITE_APPID,
  measurementId: import.meta.env.VITE_MEASUREMENTID,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export async function existDbUser(texto) {
  const docRef = doc(db, "users", texto);
  const res = await getDoc(docRef);
  return res.exists();
}

export async function addUser(user) {
  const collectionRef = collection(db, "users");
  const docRef = doc(collectionRef, user.email);
  await setDoc(docRef, user);
}

export async function updateUser(user) {
  if (localStorage.getItem("guest") == "true") {
    const data = JSON.stringify(user);
    localStorage.setItem("data", data);
    return true;
  }

  try {
    const docRef = doc(db, "users", user.email);
    await setDoc(docRef, user);
    return true;
  } catch (error) {
    return false;
  }
}

export async function returnData(email) {
  if (localStorage.getItem("guest") == "true") {
    const data = localStorage.getItem("data");
    if (data) {
      return JSON.parse(data);
    }

    return {
      rutines: [],
      rutinesTrash: [],
      objectiveExercises: [],
      corporalMeasures: [],
      name: "anonimo",
      email: "anonimo",
    };
  }

  const docRef = doc(db, "users", email);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return Promise.resolve(docSnap.data());
  } else {
    return Promise.reject("no existe el usuario");
  }
}

export async function createUser(email, contraseña) {
  try {
    await createUserWithEmailAndPassword(auth, email, contraseña);
    return true;
  } catch (error) {
    return false;
  }
}

export async function userExist(email) {
  try {
    const res = await fetchSignInMethodsForEmail(auth, email);
    if (res.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {}
}

export async function cerrarSesion() {
  await signOut(auth);
}

export async function iniciarSesion(email, contraseña) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      contraseña
    );
    const user = userCredential.user;
    if (user) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

export function isAuth() {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}
