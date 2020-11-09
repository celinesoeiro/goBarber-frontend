import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

// Hooks
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

// Components
import Button from '../../components/Button';
import Input from '../../components/Input';

// Utils
import getValidationErrors from '../../utils/getValidationErrors';

// Assets
import logo from '../../assets/images/logo.svg';

// Styles
import { Container, Content, AnimationContainer, Background } from './styles';

interface FormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { user, signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(async (data: FormData) => {
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

      await signIn({
        email: data.email,
        password: data.password
      });

      history.push('/dashboard');

    } catch (err) {
      console.log(err);
      if (err instanceof Yup.ValidationError){
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }
      addToast({
        title:'Erro na autenticação',
        type:'error',
        description:'Confira suas credenciais de acesso.'
      });
    }
  },[signIn, addToast, history]);

  return (
    <Container>
      <Content>
        <AnimationContainer>
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
          <Link to="/signup">
            <FiLogIn/>
            Criar conta
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
}

export default SignIn;
