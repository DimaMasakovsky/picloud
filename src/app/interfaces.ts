export interface User {
  displayName: string;
  email: string;
  photoURL: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  posts: Array<string>;
  following: Array<string>;
  followers: Array<string>;
  isPrivate: boolean;
  bio: string;
  uid: string;
}

export interface Post {
  author: string;
  commentCount: number;
  comments: Array<string>;
  contentPicURL: string;
  createTime: number;
  likeCount: number;
  likes: Array<string>;
  tags: Array<string>;
  textContent: string;
  id?: string;
}

export interface Commentary {
  author: string;
  createTime: number;
  textContent: string;
  id?: string;
}
