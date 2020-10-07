import React, { createContext, useCallback, useState } from 'react';
import api from '../services/api';

interface AuthState{
  token: string;
  user: object;
}

interface Credentials {
  email: string;
  password: string;
}

interface AuthInterface {
  user: object;
  signIn(credentials: Credentials): Promise<void>;
}

export const AuthContext = createContext<AuthInterface>({} as AuthInterface);

export const AuthProvier: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState >(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    if (token && user){
      return {token, user: JSON.parse(user)};
    } else {
      return {} as AuthState;
    }
  });

  const signIn = useCallback(async ({ email, password })=>{
    const response = await api.post('sessions', {
      email,
      password
    });
    const { token, userLogged } = response.data;

    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(userLogged));

    setData({ token, user: userLogged });
  },[])

  return (
    <AuthContext.Provider value={{user: data.user, signIn}}>
      {children}
    </AuthContext.Provider>
  );
};

