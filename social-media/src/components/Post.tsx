import React, { ReactElement } from 'react';

import styled from 'styled-components';
import moment from 'moment';

import { PostType } from '../types';
import LikeButton from './LikeButton';
import CommentButton from './CommentButton';

const Card = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 500px;
  margin: auto auto;
  border-style: solid;
  border-width: 1px;
  border-color: #b5b5b5;
  margin-bottom: -1px;
`;

const FirstCard = styled(Card)`
  border-radius: 5px 5px 0px 0px;
`;
const LastCard = styled(Card)`
  border-radius: 0px 0px 5px 5px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  flex: 1;
`;

const ProfilePic = styled.img`
  margin-top: 10px;
  border-radius: 50%;
  height: 50px;
  width: 50px;
`;

const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 6;
`;

const PostHeader = styled.div`
  margin-top: 10px;
`;

const PostBody = styled.div`
  word-break: break-all;
  word-wrap: break-word;
  margin-top: 5px;
  width: 80%;
`;

const PostExtra = styled.div`
  padding-bottom: 10px;
  display: flex;
`;

const PostExtraLeft = styled.div`
  flex: 5;
`;

const PostExtraRight = styled.div`
  display: flex;
  justify-content: space-around;
  flex: 2;
`;

interface Props {
  post: PostType;
  isFirst?: boolean;
  isLast?: boolean;
}

const Post: React.FC<Props> = (props): ReactElement => {
  if (props.isFirst) {
    return (
      <FirstCard>
        <UserInfo>
          <ProfilePic src='https://i.pinimg.com/564x/d9/56/9b/d9569bbed4393e2ceb1af7ba64fdf86a.jpg' />
        </UserInfo>
        <PostInfo>
          <PostHeader>
            <b>{props.post.username} </b>
            {moment(props.post.createdAt).fromNow()}
          </PostHeader>
          <PostBody>{props.post.body}</PostBody>
          <PostExtra>
            <PostExtraLeft />
            <PostExtraRight>
              <LikeButton post={props.post} />
              <CommentButton post={props.post} />
            </PostExtraRight>
          </PostExtra>
        </PostInfo>
      </FirstCard>
    );
  } else if (props.isLast) {
    return (
      <LastCard>
        <UserInfo>
          <ProfilePic src='https://i.pinimg.com/564x/d9/56/9b/d9569bbed4393e2ceb1af7ba64fdf86a.jpg' />
        </UserInfo>
        <PostInfo>
          <PostHeader>
            <b>{props.post.username} </b>
            {moment(props.post.createdAt).fromNow()}
          </PostHeader>
          <PostBody>{props.post.body}</PostBody>
          <PostExtra>
            <PostExtraLeft />
            <PostExtraRight>
              <LikeButton post={props.post} />
              <CommentButton post={props.post} />
            </PostExtraRight>
          </PostExtra>
        </PostInfo>
      </LastCard>
    );
  } else {
    return (
      <Card>
        <UserInfo>
          <ProfilePic src='https://i.pinimg.com/564x/d9/56/9b/d9569bbed4393e2ceb1af7ba64fdf86a.jpg' />
        </UserInfo>
        <PostInfo>
          <PostHeader>
            <b>{props.post.username} </b>
            {moment(props.post.createdAt).fromNow()}
          </PostHeader>
          <PostBody>{props.post.body}</PostBody>
          <PostExtra>
            <PostExtraLeft />
            <PostExtraRight>
              <LikeButton post={props.post} />
              <CommentButton post={props.post} />
            </PostExtraRight>
          </PostExtra>
        </PostInfo>
      </Card>
    );
  }
};

export default Post;
