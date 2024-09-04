import React, { useEffect, useState } from "react";
import { auth } from "./firebase";
import { Navigate } from "react-router-dom";
import { User } from "firebase/auth"; // Import the User type from Firebase

const AuthGuard: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  // Initialize state to handle user authentication
  const [authenticate, setAuthenticate] = useState<User | null>();

  useEffect(() => {
    // Set up an authentication listener
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setAuthenticate(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Redirect to login page if not authenticated
  if (authenticate === null) {
    return <Navigate to="/Login_Page" />;
  } else {
    return children;
  }
};

export default AuthGuard;
