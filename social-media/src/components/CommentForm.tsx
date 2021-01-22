import React, { useState } from 'react';
import styled from 'styled-components';

import { PostType } from '../types';
import Post from '../components/Post';

const Container = styled.div`
  position: absolute;
  width: 500px;
  left: 0;
  right: 0;
  top: 0;
  margin: auto auto;
  border: solid;
  display: flex;
  justify-content: center;
  justify-self: center;
  z-index: 1000;
  background-color: white;
`;

interface Props {
  post: PostType;
}

const CommentForm: React.FC<Props> = ({ post }) => {
  return (
    <>
      <Container>
        <Post post={post}></Post>
      </Container>
    </>
  );
};

export default CommentForm;
