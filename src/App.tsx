import React from 'react';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import { AuthProvier } from './hooks/AuthContext';

import GlobalStyle from './styles/global';

const App: React.FC = () => (
  <>
    <AuthProvier>
      <SignIn/>
      <SignUp/>
    </AuthProvier>
    <GlobalStyle/>
  </>
);

export default App;
