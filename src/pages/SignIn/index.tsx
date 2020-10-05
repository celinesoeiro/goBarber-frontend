import React from 'react';

import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

// Components
import Button from '../../components/Button';
import Input from '../../components/Input';

// Assets
import logo from '../../assets/images/logo.svg';

// Styles
import { Container, Content, Background } from './styles';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logo} alt="GoBarber"/>
      <form>
        <h1>Faça seu logon</h1>
        <Input name="email" icon={FiMail} placeholder="Email"/>

        <Input name="password" icon={FiLogIn} type="password" placeholder="Senha"/>

        <Button type="submit">
          Entrar
        </Button>
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
