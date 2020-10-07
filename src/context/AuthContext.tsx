import React, { createContext, useCallback } from 'react';
import api from '../services/api';

interface Credentials {
  email: string;
  password: string;
}

interface AuthInterface {
  name: string;
  signIn(credentials: Credentials): Promise<void>;
}

export const AuthContext = createContext<AuthInterface>({} as AuthInterface);

export const AuthProvier: React.FC = ({ children }) => {
  const signIn = useCallback(async ({ email, password })=>{
    const response = api.post('sessions', {
      email,
      password
    });
    console.log(response);
  },[])

  return (
    <AuthContext.Provider value={{name: 'celine', signIn}}>
      {children}
    </AuthContext.Provider>
  );
};

