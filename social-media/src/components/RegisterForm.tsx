import styled, { keyframes } from 'styled-components';
import React, { useState, useEffect, ComponentProps } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { History } from 'history';

import { Button } from './styled/StyledComponents';
import Input from './Input';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  margin: auto;
`;

const SpinAnim = keyframes` 
0% {
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
}
100% {
  -webkit-transform: rotate(360deg);
  transform: rotate(360deg);
}`;

const SpinnerWrapper = styled.div`
  top: 50%;
  left: 50%;
  width: 50px;
  height: 50px;
  position: absolute;
  display: none;
  transform: translate(-50%, -50%);
  &.show {
    display: block;
  }
`;

const Spinner = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(to right, green 10%, rgba(255, 255, 255, 0) 42%);
  position: absolute;
  animation: ${SpinAnim} 1.4s infinite linear;

  &:after {
    background: #ffffff;
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: '';
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
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

const REGISTER_QUERY = gql`
  mutation register(
    $username: String!
    $password: String!
    $confirmPassword: String!
    $email: String!
  ) {
    register(
      registerInput: {
        username: $username
        password: $password
        confirmPassword: $confirmPassword
        email: $email
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

interface Props {
  history: History;
}

interface Error {
  username?: string | null;
  password?: string | null;
  email?: string | null;
  confirmPassword?: string | null;
}

const RegisterForm: React.FC<Props> = (props) => {
  const fields = { username: '', password: '', confirmPassword: '', email: '' };
  const [errors, setErrors] = useState<Error>({});
  const [textCount, setTextCount] = useState(fields);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (success) {
      const interval = setInterval(() => {
        props.history.push('/login');
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [success]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'email':
        setTextCount({ ...textCount, [e.target.name]: e.target.value });
        break;
      case 'username':
        setTextCount({ ...textCount, [e.target.name]: e.target.value });
        break;
      case 'password':
        setTextCount({ ...textCount, [e.target.name]: e.target.value });
        break;
      case 'confirmPassword':
        setTextCount({ ...textCount, [e.target.name]: e.target.value });
        break;
      default:
        break;
    }
    console.log(textCount);
  };

  const [registerUser, { loading }] = useMutation(REGISTER_QUERY, {
    update(_, result) {
      console.log(result);
      setSuccess(true);
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions?.exception.errors);
    },
    variables: textCount,
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerUser();
  };

  const hide = loading ? 'hide' : '';

  return (
    <Container>
      {success ? (
        <div>
          Account creation successful! You will be redirected in 3 seconds or
          click <a href='/login'>Login </a>
          to login.
        </div>
      ) : (
        <>
          <Form onSubmit={onSubmit}>
            <Input
              className={`${errors.email ? 'error' : null} ${hide}`}
              name='email'
              onChange={onChange}
              label='Email'
            ></Input>
            <Input
              className={`${errors.username ? 'error' : null} ${hide}`}
              name='username'
              onChange={onChange}
              label='Username'
            ></Input>

            <Input
              className={`${
                errors.password || errors.confirmPassword ? 'error' : null
              } ${hide}`}
              name='password'
              type='password'
              onChange={onChange}
              label='Password'
            ></Input>

            <Input
              className={`${errors.confirmPassword ? 'error' : null} ${hide}`}
              name='confirmPassword'
              type='password'
              onChange={onChange}
              label='Confirm Password'
            ></Input>

            {Object.values(textCount).reduce((a, b) => a && b) ? (
              <Button type='submit' className={hide}>
                Register
              </Button>
            ) : (
              <Button disabled>Register</Button>
            )}
            <SpinnerWrapper className={loading ? 'show' : ''}>
              <Spinner />
            </SpinnerWrapper>
          </Form>

          {Object.keys(errors).length > 0 ? (
            <ErrorWrapper>
              <Errors>
                {Object.values(errors).map((err) => {
                  return <li key={err}>{err}</li>;
                })}
              </Errors>
            </ErrorWrapper>
          ) : null}
        </>
      )}
    </Container>
  );
};

export default RegisterForm;
