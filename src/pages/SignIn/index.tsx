import React, { useCallback, useRef, useContext } from 'react';

import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

// Context
import AuthContext from '../../context/AuthContext';

// Components
import Button from '../../components/Button';
import Input from '../../components/Input';

// Utils
import getValidationErrors from '../../utils/getValidationErrors';

// Assets
import logo from '../../assets/images/logo.svg';

// Styles
import { Container, Content, Background } from './styles';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const auth = useContext(AuthContext);

  console.log('auth',auth)

  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('O campo Email é obrigatório')
          .email('Digite um email válido'),
        password: Yup.string()
          .required('O campo Senha é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false
      });

    } catch (err) {
      console.log(err);

      const errors = getValidationErrors(err);

      formRef.current?.setErrors(errors);
    }
  },[]);

  return (
    <Container>
      <Content>
        <img src={logo} alt="GoBarber"/>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu logon</h1>
          <Input name="email" icon={FiMail} placeholder="Email"/>

          <Input name="password" icon={FiLock} type="password" placeholder="Senha"/>

          <Button type="submit">
            Entrar
          </Button>
          <a href="/recover">Esqueci minha senha</a>
        </Form>
        <a href="/login">
          <FiLogIn/>
          Criar conta
        </a>
      </Content>
      <Background />
    </Container>
  );
}

export default SignIn;
