import React from 'react';

import { FiLogIn } from 'react-icons/fi';

import logo from '../../assets/images/logo.svg';

import { Container, Content, Background } from './styles';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logo} alt="GoBarber"/>
      <form>
        <h1>Faça seu logon</h1>
        <input placeholder="Email">

        </input>
        <input type="password" placeholder="Senha">

        </input>
        <button type="submit">
          Entrar
        </button>
        <a href="/recover">Esqueci minha senha</a>
      </form>
      <a href="/login">
        <FiLogIn/>
        Criar conta
      </a>
    </Content>
    <Background />
  </Container>
);

export default SignIn;
