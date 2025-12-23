import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../Firebase";
const provider = new GoogleAuthProvider();
const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createuser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signinuser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  let googleLoginIn = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };
  let logOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };
  let userupdateProfile = (profile) => {
    setLoading(true);
    return updateProfile(auth.currentUser, profile);
  };

  useEffect(() => {
    let unsubcribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubcribe();
    };
  }, []);

  let authinfo = {
    createuser,
    googleLoginIn,
    logOutUser,
    userupdateProfile,
    signinuser,
    loading,
    setLoading, 
    user,
    setUser, 
    
  };
  return <AuthContext value={authinfo}>{children}</AuthContext>;
};

export default AuthProvider;
