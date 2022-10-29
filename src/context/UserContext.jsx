import React, { useContext, useState, useEffect } from "react";
import { auth, database } from "../firebase";
import { updateProfile } from "firebase/auth";

import { collection, addDoc } from "firebase/firestore";

const collectionRef = collection(database, "users");
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [serverLoading, setServerLoading] = useState(true);

  async function signup(email, password, nick) {
    const { user } = await auth.createUserWithEmailAndPassword(email, password);

    addDoc(collectionRef, {
      email,
      password,
      nick,
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
  function logout() {
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

  const value = {
    currentUser,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!serverLoading && children}
    </AuthContext.Provider>
  );
}
