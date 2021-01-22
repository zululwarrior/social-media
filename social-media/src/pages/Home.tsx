import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';

import Post from '../components/Post';
import NewPostForm from '../components/NewPostForm';
import CommentForm from '../components/CommentForm';

import { PostType } from '../types';
import { FETCH_POSTS_QUERY } from '../graphqlQueries';
import { AuthContext } from '../context/AuthContext';

const Container = styled.div`
  position: relative;
  display: flex;
  margin-top: 10px;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 3;
  margin-right: 10px;
`;

const RightContainer = styled.div`
  position: sticky;
  border-style: solid;
  height: 0%;
  top: 0;
  flex: 1;
  align-self: flex-start;
  max-width: 300px;
`;

interface ResultData {
  getPosts: [PostType];
}

const Home: React.FC = () => {
  const context = useContext(AuthContext);
  const { loading, data } = useQuery<ResultData>(FETCH_POSTS_QUERY);
  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <Container>
        <LeftContainer>
          {context.user ? <NewPostForm /> : ''}
          {data?.getPosts.map((post: PostType, i: number) => {
            if (i === 0) {
              return <Post key={post.id} post={post} isFirst={true} />;
            } else if (i === data.getPosts.length - 1) {
              return <Post key={post.id} post={post} isLast={true} />;
            } else {
              return <Post key={post.id} post={post} />;
            }
          }) || 'Error'}
        </LeftContainer>
        <RightContainer>
          <div>Test</div>
        </RightContainer>
      </Container>
    );
  }
};

export default Home;
