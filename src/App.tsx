import React from 'react';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import AuthContext from './context/AuthContext';

import GlobalStyle from './styles/global';

const App: React.FC = () => (
  <>
    <AuthContext.Provider value={{name: 'Celine'}}>
      <SignIn/>
      <SignUp/>
    </AuthContext.Provider>
    <GlobalStyle/>
  </>
);

export default App;
