import { useState } from "react";
import { LOCAL_STORAGE_SESSION_KEY } from "../utils/constants";
import { getJsonFromLocalStorage } from "../utils/localStorage";

export function useSession() {
  const [userSession, setUserSession] = useState(getJsonFromLocalStorage(LOCAL_STORAGE_SESSION_KEY));
  const [isLogged, setIsLogged] = useState(userSession !== null);

  const signIn = (user) => {
    setUserSession(user);
    setIsLogged(true);
    localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(user));
  }

  const signOut = () => {
    setUserSession(null);
    setIsLogged(false);
    localStorage.removeItem(LOCAL_STORAGE_SESSION_KEY);
  }

  return { userSession, isLogged, signIn, signOut };
}