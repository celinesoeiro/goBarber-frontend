import React, { createContext, useCallback, useState, useContext } from 'react';
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

const AuthContext = createContext<AuthInterface>({} as AuthInterface);

const AuthProvier: React.FC = ({ children }) => {
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

function useAuth(): AuthInterface {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error ('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvier, useAuth };
