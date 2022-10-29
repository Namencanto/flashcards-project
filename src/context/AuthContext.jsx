import React, { useContext, useState, useEffect } from "react";
import { auth, database } from "../firebase";
import { updateProfile, getAuth } from "firebase/auth";

import { getFirestore, setDoc } from "firebase/firestore";

import {
  collection,
  addDoc,
  doc,
  updateDoc,
  getDocs,
} from "firebase/firestore";

const usersCollection = collection(database, "users");

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [serverLoading, setServerLoading] = useState(true);

  async function signup(email, password, nick) {
    const { user } = await auth.createUserWithEmailAndPassword(email, password);

    addDoc(usersCollection, {
      email,
      password,
      nick,
    })
      .then((response) => {
        // Profile updated!
        // ...

        console.log("response");
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        // An error occurred
        // ...
      });

    // const currentUserRef = doc(database, "users", currentUser.uid);
    // await updateDoc(currentUserRef, {
    //   aboutMeInfo: info,
    // });

    await updateProfile(user, {
      displayName: nick,
    })
      .then((response) => {
        // Profile updated!
        // ...
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        // An error occurred
        // ...
      });
  }

  async function logout() {
    return auth.signOut();
  }
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);

      setServerLoading(false);
    });

    return unsubscribe;
  }, []);

  /*
   * database functions
   */

  async function updateAboutMe(info) {
    const currentUserRef = doc(database, "users", currentUser.uid);
    await updateDoc(currentUserRef, {
      aboutMeInfo: info,
    });
  }

  const value = {
    currentUser,
    login,
    signup,
    logout,
    updateAboutMe,
  };

  return (
    <AuthContext.Provider value={value}>
      {!serverLoading && children}
    </AuthContext.Provider>
  );
}
