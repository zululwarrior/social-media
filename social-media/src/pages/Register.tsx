import React from 'react';
import styled from 'styled-components';
import { History } from 'history';

import RegisterForm from '../components/RegisterForm';

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

const Register: React.FC<Props> = (props) => {
  return (
    <>
      <Container>
        <Text>Register</Text>
        <RegisterForm history={props.history} />
      </Container>
    </>
  );
};

export default Register;
