import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

import { FETCH_POSTS_QUERY } from '../graphqlQueries';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Text = styled.div`
  position: relative;
  padding: 5px;
  border-bottom: solid;
  border-width: 1px;
  border-color: #473c3c;
  min-height: 100px;
  max-height: 70vh;
  width: 500px;
  overflow: auto;
  &[contenteditable='true']:empty:before {
    content: attr(placeholder);
    color: #666666;
    pointer-events: none;
    display: block;
  }
  &:focus {
    outline: none;
    border-color: black;
  }
`;

const Button = styled.button`
  display: flex;
  width: 50px;
  height: 30px;
  margin-top: 10px;
  border-style: none;
  border-radius: 30px;
  color: white;
  background-color: #29a6ff;
  font-weight: bold;
  align-self: flex-end;
  align-items: center;
  justify-content: center;

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
`;

const CREATE_POST_QUERY = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      username
      body
      createdAt
    }
  }
`;

const NewPostForm: React.FC = () => {
  const [text, setText] = useState<string>('');

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>): void => {
    let data =
      e.clipboardData.getData('text/html') ||
      e.clipboardData.getData('text/plain');
    let regex = /<(?!(\/\s*)?(a|b|i|em|s|strong|u)[>,\s])([^>])*>/g;
    data = data.replace(regex, '');

    document.execCommand('insertHTML', false, data);

    e.preventDefault();
  };

  const handleChange = (e: React.FormEvent<HTMLDivElement>): void => {
    const input = e.target as HTMLElement;
    setText(input.innerText);
    console.log(text);
  };

  const [createPost, { loading }] = useMutation(CREATE_POST_QUERY, {
    update(proxy, result) {
      const data: any = proxy.readQuery({ query: FETCH_POSTS_QUERY });
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: { getPosts: [result.data.createPost, ...data.getPosts] },
      });
    },
    refetchQueries: () => [{ query: FETCH_POSTS_QUERY }],
    onError(err) {
      console.log(err);
    },
    variables: { body: text },
  });

  const input = useRef<HTMLDivElement>(null);

  const submitForm = (e: React.FormEvent<HTMLFormElement>): void => {
    setText('');
    if (input.current) {
      input.current.innerHTML = '';
    }
    e.preventDefault();
    createPost();
  };

  return (
    <Container>
      <Form onSubmit={submitForm}>
        <Text
          contentEditable='true'
          aria-label='test'
          placeholder='Whats on your mind'
          ref={input}
          onPaste={handlePaste}
          onInput={handleChange}
        />

        <Button>Post</Button>
      </Form>
    </Container>
  );
};

export default NewPostForm;
