import React from 'react';
import styled from 'styled-components';
import { History } from 'history';
import LoginForm from '../components/LoginForm';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Text = styled.div`
  margin: 20px;
  font-size: 1.5rem;
  font-weight: bold;
`;

interface Props {
  history: History;
}

const Login: React.FC<Props> = (props) => {
  return (
    <Container>
      <Text>Log in</Text>
      <LoginForm history={props.history} />
    </Container>
  );
};

export default Login;
