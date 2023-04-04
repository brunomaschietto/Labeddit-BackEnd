import {
  CommentDB,
  CommentWithCreatorsDB,
    COMMENT_LIKE,
    LikesDislikesCommentsDB,
  } from "../interfaces/types";
  import { BaseDatabase } from "./BaseDataBase";
  
  export class CommentDataBase extends BaseDatabase {
    public static TABLE_COMMENTS = "comments";
    public static TABLE_LIKES_DISLIKES = "likes_dislikes";
  
    public getCommentsWithCreators = async (id:string): Promise<CommentWithCreatorsDB[]> => {
      const result: CommentWithCreatorsDB[] = await BaseDatabase.connection(
        CommentDataBase.TABLE_COMMENTS
      )
        .select(
          "comments.id",
          "comments.creator_id",
          "comments.post_id",
          "comments.content",
          "comments.likes",
          "comments.dislikes",
          "comments.created_at",
          "users.name AS creator_name"
        )
        .join("users", "comments.creator_id", "=", "users.id")
        .join("posts", "comments.post_id", "=", "posts.id")
        .where("comments.post_id", id)
      return result;
    };
  
    public insert = async (commentDB: CommentDB): Promise<void> => {
      await BaseDatabase.connection(CommentDataBase.TABLE_COMMENTS).insert(commentDB);
    };
  
    public findById = async (id: string): Promise<CommentDB | undefined> => {
      const result: CommentDB[] = await BaseDatabase.connection(
        CommentDataBase.TABLE_COMMENTS
      )
        .select()
        .where({ id });
      return result[0];
    };
    public update = async (id: string, commentDB: CommentDB): Promise<void> => {
      await BaseDatabase.connection(CommentDataBase.TABLE_COMMENTS)
        .update(commentDB)
        .where({ id });
    };
    public delete = async (id: string): Promise<void> => {
      await BaseDatabase.connection(CommentDataBase.TABLE_COMMENTS)
        .delete()
        .where({ id });
    };
    public likeOrDislikeComment = async (
      likeDislike: LikesDislikesCommentsDB
    ): Promise<void> => {
      await BaseDatabase.connection(CommentDataBase.TABLE_LIKES_DISLIKES).insert(
        likeDislike
      );
    };
    public findCommentsWithCreatorById = async (
      commentId: string
    ): Promise<CommentWithCreatorsDB | undefined> => {
      const result: CommentWithCreatorsDB[] = await BaseDatabase.connection(
        CommentDataBase.TABLE_COMMENTS
      )
        .select(
          "comments.id",
          "comments.creator_id",
          "comments.content",
          "comments.likes",
          "comments.dislikes",
          "comments.created_at",
          "comments.updated_at",
          "users.name AS creator_name"
        )
        .join("users", "comments.creator_id", "=", "users.id")
        .where("comments.id", commentId);
      return result[0];
    };
    public findLikeDislike = async (
      likeDislikeToFind: LikesDislikesCommentsDB
    ): Promise<COMMENT_LIKE | null> => {
      const [likeDislikeDB]: LikesDislikesCommentsDB[] = await BaseDatabase.connection(
        CommentDataBase.TABLE_LIKES_DISLIKES
      )
        .select()
        .where({
          user_id: likeDislikeToFind.user_id,
          comment_id: likeDislikeToFind.comment_id,
        });
      if (likeDislikeDB) {
        return likeDislikeDB.like === 1
          ? COMMENT_LIKE.ALREADY_LIKED
          : COMMENT_LIKE.ALREADY_DESLIKED;
      } else {
        return null;
      }
    };
    public removeLikeDislike = async (
      likeDislikeDB: LikesDislikesCommentsDB
    ): Promise<void> => {
      await BaseDatabase.connection(CommentDataBase.TABLE_LIKES_DISLIKES)
        .delete()
        .where({
          user_id: likeDislikeDB.user_id,
          comment_id: likeDislikeDB.comment_id,
        });
    };
    public updateLikeDislike = async (
      likeDislikeDB: LikesDislikesCommentsDB
    ) => {
      await BaseDatabase.connection(CommentDataBase.TABLE_LIKES_DISLIKES)
        .update(likeDislikeDB)
        .where({
          user_id: likeDislikeDB.user_id,
          comment_id: likeDislikeDB.comment_id,
        });
    };
  }
  