interface LikeType {
  id: number;
  username: string;
  createdAt: string;
}

interface PostType {
  id: number;
  body: string;
  username: string;
  commentCount: number;
  likeCount: number;
  createdAt: string;
  likes: [LikeType];
}

export type { PostType, LikeType };
