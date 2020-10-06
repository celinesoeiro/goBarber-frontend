import { createContext } from 'react';

interface AuthInterface {
  name: string;
}

const AuthContext = createContext<AuthInterface>({} as AuthInterface);

export default AuthContext;
