import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

// API
import api from '../../services/api';

// Hooks
import { useToast } from '../../hooks/toast';

// Utils
import getValidationErrors from '../../utils/getValidationErrors';

// Icons
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';

// Components
import Button from '../../components/Button';
import Input from '../../components/Input';

// Assets
import logo from '../../assets/images/logo.svg';

// Styles
import { Container, Content, AnimationContainer, Background } from './styles';

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const history = useHistory();

  const handleSubmit = useCallback(async (data: SignUpData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('O campo Nome é obrigatório'),
        email: Yup.string()
          .required('O campo Email é obrigatório')
          .email('Digite um email válido'),
        password: Yup.string()
          .min(6, 'A senha deve ter no mínimo 6 dígitos'),
      });

      await schema.validate(data, {
        abortEarly: false
      });

      await api.post('/users', data);

      history.push('/');

      addToast({
        type: 'success',
        title: 'Cadastro realizado com sucesso',
        description: 'Você já pode fazer seu login no GoBarber'
      });

    } catch (err) {
      console.log(err);
      if (err instanceof Yup.ValidationError){
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }
      addToast({
        title:'Erro no cadastro',
        type:'error',
        description:'Ocorreu um erro ao fazer seu cadastro, tente novamente.'
      });
    }
  },[addToast, history]);

  return (
    <Container>
      <Background />

      <Content>
        <AnimationContainer>
          <img src={logo} alt="GoBarber"/>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>
            <Input name="name" icon={FiUser} placeholder="Nome"/>
            <Input name="email" icon={FiMail} placeholder="Email"/>
            <Input name="password" icon={FiLock} type="password" placeholder="Senha"/>

            <Button type="submit">
              Cadastrar
            </Button>

          </Form>
          <Link to="/">
            <FiArrowLeft/>
            Voltar pro login
          </Link>
        </AnimationContainer>
      </Content>

    </Container>
  );
}

export default SignUp;
