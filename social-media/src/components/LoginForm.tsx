import styled from 'styled-components';
import React, { useState, useContext } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { History } from 'history';
import { AuthContext } from '../context/AuthContext';

import { Button } from './styled/StyledComponents';
import Input from './Input';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  margin: auto;
`;

const ErrorWrapper = styled.div`
  margin: auto;
  background-color: #ffcfcf;
  border-style: solid;
  border-width: 1px;
  border-color: #d17373;
  border-radius: 5px;
  width: 100%;
  max-width: 500px;
`;

const Errors = styled.ul`
  color: #b34040;
`;

const LOGIN_QUERY = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
interface Error {
  username?: string | null;
  password?: string | null;
}

interface Props {
  history: History;
}

const LoginForm: React.FC<Props> = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Error>({});
  const [success, setSuccess] = useState(false);

  const context = useContext(AuthContext);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.name === 'username'
      ? setUsername(e.target.value)
      : setPassword(e.target.value);
  };

  const [loginUser, { loading }] = useMutation(LOGIN_QUERY, {
    update(_, result) {
      setSuccess(true);
      context.login(result.data.login);
      props.history.push('/');
    },
    onError(err) {
      setErrors(
        err.graphQLErrors[0].extensions?.exception.errors || { error: 'error' }
      );
    },
    variables: { username, password },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginUser();
  };

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <Input label='Username' name='username' onChange={onChange}></Input>
        <Input
          label='Password'
          name='password'
          type='password'
          onChange={onChange}
        ></Input>
        {username.length && password.length > 0 ? (
          <Button>Log in</Button>
        ) : (
          <Button disabled>Log in</Button>
        )}
      </Form>
      {Object.keys(errors).length > 0 ? (
        <ErrorWrapper>
          <Errors>
            {Object.values(errors).map((err: string) => {
              return <li key={err}>{err}</li>;
            })}
          </Errors>
        </ErrorWrapper>
      ) : null}
    </Container>
  );
};

export default LoginForm;
