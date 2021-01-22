import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import { ReactComponent as Heart } from '../svgs/heart.svg';
import { AuthContext } from '../context/AuthContext';
import { PostType } from '../types';

const LIKE_QUERY = gql`
  mutation($postId: ID!) {
    likePost(postId: $postId) {
      id
      body
      createdAt
      likeCount
      likes {
        id
        username
        createdAt
      }
    }
  }
`;

const Button = styled.svg`
  transition: fill 0.1s linear;
  height: 20px;
  width: 20px;
`;

const LikeElement = styled.div`
  display: flex;
  align-items: center;
`;

type Liked = {
  liked: boolean;
};

const LikeHeart = styled(Button)<Liked>`
  fill: ${(props) => (props.liked ? '#f3b6b6' : '#d7443e')};
`;

const LikeButtonWrapper = styled(Link)`
  &:hover ${LikeHeart} {
    cursor: pointer;
    fill: #f09292;
  }
`;

const LikeAmount = styled.span`
  padding-left: 2px;
`;

interface Props {
  post: PostType;
}

const LikeButton: React.FC<Props> = ({ post }) => {
  const context = useContext(AuthContext);
  const [liked, setLiked] = useState<boolean>(false);

  const [like] = useMutation(LIKE_QUERY, {
    variables: { postId: post.id },
  });

  useEffect(() => {
    if (
      context.user &&
      post.likes.find(
        (like) => like.username === context.user?.username || null
      )
    ) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [context.user, post.likes]);

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    like();
  };

  return (
    <LikeElement>
      {context.user ? (
        <LikeButtonWrapper to='' onClick={onClick}>
          <LikeHeart liked={liked}>
            <Heart />
          </LikeHeart>
        </LikeButtonWrapper>
      ) : (
        <LikeButtonWrapper to='/login'>
          <LikeHeart liked={liked}>
            <Heart />
          </LikeHeart>
        </LikeButtonWrapper>
      )}

      <LikeAmount>{post.likeCount}</LikeAmount>
    </LikeElement>
  );
};

export default LikeButton;
