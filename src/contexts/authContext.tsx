import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, firebase } from "../services/firebase";
import { IsSignedStatus } from "../@type/enums/enums";


type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
  isSigned: IsSignedStatus;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [isSigned, setIsSigned] = useState(IsSignedStatus.TRUE);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setIsSigned(IsSignedStatus.TRUE)
      } else {
        console.log('TESTE')
        setIsSigned(IsSignedStatus.FALSE)
      }

      if (user) {
        const {displayName, photoURL, uid} = user;

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Accont')
        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }

    })

    return () => {
      unsubscribe();
    }
  }, [isSigned])

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const {displayName, photoURL, uid} = result.user;

      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Accont')
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }

  return (
    <AuthContext.Provider value={{user, signInWithGoogle, isSigned}}>
      {props.children}
    </AuthContext.Provider>
  )
}
