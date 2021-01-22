import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { ReactComponent as Comment } from '../svgs/comment.svg';
import { PostType } from '../types';
import CommentForm from './CommentForm';

const BackgroundDimmer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: black;
  opacity: 30%;
  z-index: 999;
`;

const Button = styled.svg`
  transition: fill 0.1s linear;
  height: 20px;
  width: 20px;
`;

const CommentElement = styled.div`
  display: flex;
  align-items: center;
`;

const CommentBubble = styled(Button)`
  fill: #096fd6;
`;

const CommentButtonWrapper = styled.a`
  &:hover ${CommentBubble} {
    cursor: pointer;
    fill: #63adf7;
  }
`;

const CommentAmount = styled.span`
  padding-left: 2px;
`;

interface Props {
  post: PostType;
}

const CommentButton: React.FC<Props> = ({ post }) => {
  const [show, setShow] = useState(false);

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setShow(true);
  };

  const onLoseFocus = () => {
    setShow(false);
  };

  return show ? (
    <>
      <BackgroundDimmer onClick={onLoseFocus} />
      <CommentForm post={post} />
      <CommentElement>
        <CommentButtonWrapper onClick={onClick}>
          <CommentBubble>
            <Comment />
          </CommentBubble>
        </CommentButtonWrapper>
        <CommentAmount>{post.commentCount}</CommentAmount>
      </CommentElement>
    </>
  ) : (
    <CommentElement>
      <CommentButtonWrapper onClick={onClick}>
        <CommentBubble>
          <Comment />
        </CommentBubble>
      </CommentButtonWrapper>
      <CommentAmount>{post.commentCount}</CommentAmount>
    </CommentElement>
  );
};

export default CommentButton;
