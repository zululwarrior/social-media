import styled from 'styled-components';

const Button = styled.button`
  position: relative;
  width: 100%;
  margin: 0px 0px 20px 0px;
  padding: 15px 0px 15px 0px;
  border-style: none;
  border-radius: 100px;
  font-weight: bold;
  color: white;
  background-color: #29a6ff;

  &:focus {
    outline: none;
  }
  &:hover {
    background-color: #0085e3;
    cursor: pointer;
  }
  &:disabled {
    background-color: grey;
    cursor: default;
  }
  transition: background-color 0.1s linear;
  &.hide {
    visibility: hidden;
  }
`;

export { Button };
