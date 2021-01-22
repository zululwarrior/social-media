import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  color: #545454;
`;

const InputWrapper = styled.div`
  max-width: 500px;
  background-color: #e4ecf2;
  border-bottom: solid;
  border-color: #545454;
  border-width: 2px;
  border-radius: 3px;
  margin-bottom: 20px;
  padding: 5px 10px 5px 10px;
  &:focus-within {
    border-color: #45baff;
  }
  &:focus-within ${Label} {
    color: #45baff;
  }
  &.error {
    border-color: #e31b1b;
    ${Label} {
      color: #e31b1b;
    }
  }
  &.hide {
    visibility: hidden;
  }
`;

const InputField = styled.input`
  border: none;
  width: 100%;
  background-color: #e4ecf2;
  font-size: 15px;
  &:focus {
    outline: none;
  }
`;

interface Props {
  label: string;
  name: string;
  type?: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<Props> = (props) => {
  return (
    <InputWrapper>
      <Label>{props.label}</Label>
      <InputField
        name={props.name}
        autoComplete='off'
        onChange={props.onChange}
        type={props?.type}
        className={props?.className}
      ></InputField>
    </InputWrapper>
  );
};

export default Input;
