import { BaseDatabase } from "../../src/database/BaseDatabase";
import {
  LikesDislikesDB,
  POST_LIKE,
  PostDB,
  PostWithCreatorsDB,
} from "../../src/interfaces/types";

export class PostDatabaseMock extends BaseDatabase {
  public static TABLE_POSTS = "posts";
  public static TABLE_LIKES_DISLIKES = "likes_dislikes";

  public getPostsWithCreators = async (): Promise<PostWithCreatorsDB[]> => {
    return [
      {
        id: "p001",
        creator_id: "id-mock",
        content: "publicacao1",
        comments: 0,
        likes: 1,
        dislikes: 1,
        created_at: expect.any(String),
        updated_at: expect.any(String),
        creator_name: "nome-criador",
      },
      {
        id: "p002",
        creator_id: "id-mock",
        content: "publicacao2",
        comments: 1,
        likes: 0,
        dislikes: 0,
        created_at: expect.any(String),
        updated_at: expect.any(String),
        creator_name: "nome-criador",
      },
    ];
  };

  public findPostsWithCreatorById = async (
    postId: string
  ): Promise<PostWithCreatorsDB | undefined> => {
    if (postId === "p001") {
      return {
        id: "p001",
        creator_id: "id-mock",
        content: "publicacao1",
        comments: 0,
        likes: 1,
        dislikes: 1,
        created_at: expect.any(String),
        updated_at: expect.any(String),
        creator_name: "nome-criador",
      };
    }
  };

  public findById = async (id: string): Promise<PostDB | undefined> => {
    if (id === "p001") {
      return {
        id: "p001",
        creator_id: "id-mock",
        content: "publicacao1",
        comments: 0,
        likes: 1,
        dislikes: 1,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      };
    }
  };
  public insert = async (newPostDB: PostDB): Promise<void> => {};
  public update = async (id: string, postDB: PostDB): Promise<void> => {};
  public delete = async (id: string): Promise<void> => {};
  public likeOrDislikePost = async (
    likeDislike: LikesDislikesDB
  ): Promise<void> => {};
  public findLikeDislike = async (
    likeDislike: LikesDislikesDB
  ): Promise<POST_LIKE | null> => {
    if (likeDislike.like === 1) {
      return POST_LIKE.JA_CURTIU;
    } else if (likeDislike.like === 0) {
      return POST_LIKE.JA_DESCURTIU;
    } else {
      return null;
    }
  };
  public removeLikeDislike = async (
    likeDislikeDB: LikesDislikesDB
  ): Promise<void> => {};
  public updateLikeDislike = async (
    likeDislikeDB: LikesDislikesDB
  ): Promise<void> => {};
}
