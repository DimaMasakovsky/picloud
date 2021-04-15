export interface User {
  displayName: string,
  email: string,
  photoURL: string, 
  postsCount: number, 
  followersCount: number,
  followingCount: number,
  posts: Array<string>,
  uid: string
}

export interface Post {
  author: string,
  commentCount: number, 
  comments: Array<string>, 
  contentPicURL: string, 
  createTime: Map<string, number>,
  likeCount: number, 
  tags: Array<string>,
  textContent: string
}