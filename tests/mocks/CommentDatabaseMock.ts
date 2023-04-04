import { BaseDatabase } from "../../src/database/BaseDataBase";
import {
  COMMENT_LIKE,
  CommentDB,
  CommentWithCreatorsDB,
  LikesDislikesCommentsDB,
} from "../../src/interfaces/types";

export class CommentDatabaseMock extends BaseDatabase {
  public static TABLE_COMMENTS = "comments";

  public static TABLE_LIKES_DISLIKES = "likes_dislikes";

  public getCommentsWithCreators = async (): Promise<
    CommentWithCreatorsDB[]
  > => {
    return [
      {
        id: "c001",
        creator_id: "id-mock",
        post_id: "p001",
        content: "publicacao1",
        likes: 1,
        dislikes: 1,
        created_at: expect.any(String),
        creator_name: "nome-criador",
      },
      {
        id: "c002",
        creator_id: "id-mock",
        post_id: "p002",
        content: "publicacao2",
        likes: 1,
        dislikes: 1,
        created_at: expect.any(String),
        creator_name: "nome-criador",
      },
    ];
  };

  public findCommentsWithCreatorById = async (
    commentId: string
  ): Promise<CommentWithCreatorsDB | undefined> => {
    if (commentId === "c001") {
      return {
        id: "c001",
        creator_id: "id-mock",
        post_id: "p001",
        content: "publicacao1",
        likes: 1,
        dislikes: 1,
        created_at: expect.any(String),
        creator_name: "nome-criador",
      };
    }
  };

  public findById = async (id: string): Promise<CommentDB | undefined> => {
    if (id === "c001") {
      return {
        id: "c001",
        creator_id: "id-mock",
        post_id: "p001",
        content: "publicacao1",
        likes: 1,
        dislikes: 1,
        created_at: expect.any(String),
      };
    }
  };
  public insert = async (newCommentDB: CommentDB): Promise<void> => {};
  public update = async (id: string, commentDB: CommentDB): Promise<void> => {};
  public delete = async (id: string): Promise<void> => {};
  public likeOrDislikeComment = async (
    likeDislike: LikesDislikesCommentsDB
  ): Promise<void> => {};
  public findLikeDislike = async (
    likeDislike: LikesDislikesCommentsDB
  ): Promise<COMMENT_LIKE | null> => {
    if (likeDislike.like === 1) {
      return COMMENT_LIKE.ALREADY_LIKED;
    } else if (likeDislike.like === 0) {
      return COMMENT_LIKE.ALREADY_DESLIKED;
    } else {
      return null;
    }
  };
  public removeLikeDislike = async (
    likeDislikeDB: LikesDislikesCommentsDB
  ): Promise<void> => {};
  public updateLikeDislike = async (
    likeDislikeDB: LikesDislikesCommentsDB
  ): Promise<void> => {};
}
