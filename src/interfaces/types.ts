export enum USER_ROLES {
  NORMAL = "NORMAL",
  ADMIN = "ADMIN",
}

export interface TokenPayload {
  id: string;
  name: string;
  role: USER_ROLES;
}

export interface UserDB {
  id: string;
  name: string;
  email: string;
  password: string;
  role: USER_ROLES;
  created_at: string;
}

export interface UserModel {
  id: string;
  name: string;
  email: string;
  password: string;
  role: USER_ROLES;
  createdAt: string;
}

export interface PostModel {
  id: string;
  content: string;
  comments: number;
  likes: number;
  dislikes: number;
  createdAt: string;
  updatedAt: string;
  creator: {
    id: string;
    name: string;
  };
}

export interface PostDB {
  id: string;
  creator_id: string;
  content: string;
  comments: number;
  likes: number;
  dislikes: number;
  created_at: string;
  updated_at: string;
}

export interface CommentModel {
  id: string;
  content: string;
  likes: number;
  dislikes: number;
  createdAt: string;
  updatedAt: string;
  creator: {
    id: string;
    name: string;
  };
}

export interface CommentDB {
  id: string;
  creator_id: string;
  content: string;
  likes: number;
  dislikes: number;
  created_at: string;
  updated_at: string;
}

export interface PostWithCreatorsDB extends PostDB {
  creator_name: string;
}

export interface CommentWithCreatorsDB extends CommentDB {
  creator_name: string;
}

export interface LikesDislikesDB {
  user_id: string;
  post_id: string;
  like: number;
}

export interface LikesDislikesCommentsDB {
  user_id: string;
  comment_id: string;
  like: number;
}

export enum POST_LIKE {
  JA_CURTIU = "Já deu like",
  JA_DESCURTIU = "Já deu dislike",
}

export enum COMMENT_LIKE {
  ALREADY_LIKED = "Já deu like",
  ALREADY_DESLIKED = "Já deu dislike",
}
