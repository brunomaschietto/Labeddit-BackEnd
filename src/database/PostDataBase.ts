import {
  LikesDislikesDB,
  PostDB,
  PostWithCreatorsDB,
  POST_LIKE,
  UserDB,
} from "../interfaces/types";
import { BaseDatabase } from "./BaseDataBase";

export class PostDataBase extends BaseDatabase {
  public static TABLE_POSTS = "posts";
  public static TABLE_LIKES_DISLIKES = "likes_dislikes";

  public getPostsWithCreators = async (): Promise<PostWithCreatorsDB[]> => {
    const result: PostWithCreatorsDB[] = await BaseDatabase.connection(
      PostDataBase.TABLE_POSTS
    )
      .select(
        "posts.id",
        "posts.creator_id",
        "posts.content",
        "posts.comments",
        "posts.likes",
        "posts.dislikes",
        "posts.created_at",
        "posts.updated_at",
        "users.name AS creator_name"
      )
      .join("users", "posts.creator_id", "=", "users.id");
    return result;
  };

  public insert = async (postDB: PostDB): Promise<void> => {
    await BaseDatabase.connection(PostDataBase.TABLE_POSTS).insert(postDB);
  };

  public findById = async (id: string): Promise<PostDB | undefined> => {
    const result: PostDB[] = await BaseDatabase.connection(
      PostDataBase.TABLE_POSTS
    )
      .select()
      .where({ id });
    return result[0];
  };
  public update = async (id: string, postDB: PostDB): Promise<void> => {
    await BaseDatabase.connection(PostDataBase.TABLE_POSTS)
      .update(postDB)
      .where({ id });
  };
  public delete = async (id: string): Promise<void> => {
    await BaseDatabase.connection(PostDataBase.TABLE_POSTS)
      .delete()
      .where({ id });
  };
  public likeOrDislikePost = async (
    likeDislike: LikesDislikesDB
  ): Promise<void> => {
    await BaseDatabase.connection(PostDataBase.TABLE_LIKES_DISLIKES).insert(
      likeDislike
    );
  };
  public findPostsWithCreatorById = async (
    postId: string
  ): Promise<PostWithCreatorsDB | undefined> => {
    const result: PostWithCreatorsDB[] = await BaseDatabase.connection(
      PostDataBase.TABLE_POSTS
    )
      .select(
        "posts.id",
        "posts.creator_id",
        "posts.content",
        "posts.comments",
        "posts.likes",
        "posts.dislikes",
        "posts.created_at",
        "posts.updated_at",
        "users.name AS creator_name"
      )
      .join("users", "posts.creator_id", "=", "users.id")
      .where("posts.id", postId);
    return result[0];
  };
  public findLikeDislike = async (
    likeDislikeToFind: LikesDislikesDB
  ): Promise<POST_LIKE | null> => {
    const [likeDislikeDB]: LikesDislikesDB[] = await BaseDatabase.connection(
      PostDataBase.TABLE_LIKES_DISLIKES
    )
      .select()
      .where({
        user_id: likeDislikeToFind.user_id,
        post_id: likeDislikeToFind.post_id,
      });
    if (likeDislikeDB) {
      return likeDislikeDB.like === 1
        ? POST_LIKE.JA_CURTIU
        : POST_LIKE.JA_DESCURTIU;
    } else {
      return null;
    }
  };
  public removeLikeDislike = async (
    likeDislikeDB: LikesDislikesDB
  ): Promise<void> => {
    await BaseDatabase.connection(PostDataBase.TABLE_LIKES_DISLIKES)
      .delete()
      .where({
        user_id: likeDislikeDB.user_id,
        post_id: likeDislikeDB.post_id,
      });
  };
  public updateLikeDislike = async (
    likeDislikeDB: LikesDislikesDB
  ) => {
    await BaseDatabase.connection(PostDataBase.TABLE_LIKES_DISLIKES)
      .update(likeDislikeDB)
      .where({
        user_id: likeDislikeDB.user_id,
        post_id: likeDislikeDB.post_id,
      });
  };
}
