import { CommentDataBase } from "../database/CommentDataBase";
import { CreateCommentInputDTO, DeleteCommentInputDTO, GetCommentsInputDTO, GetCommentsOutputDTO, LikeOrDislikeCommentInputDTO } from "../dtos/commentDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import {
  CommentWithCreatorsDB,
  COMMENT_LIKE,
  LikesDislikesCommentsDB,
  USER_ROLES,
  CommentDB,
} from "../interfaces/types";
import { Comment } from "../models/Comment";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class CommentBusiness {
  constructor(
    private commentDataBase: CommentDataBase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager,
    private hashManager: HashManager
  ) {}
  public getAllComments = async (
    input: GetCommentsInputDTO
  ): Promise<GetCommentsOutputDTO> => {
    const { token, id } = input;
    console.log(id)

    if (token === undefined) {
      throw new BadRequestError("'token' ausente");
    }

    const payload = this.tokenManager.getPayload(token);

    if (payload === null) {
      throw new BadRequestError("Token inválido");
    }

    const commentsWithCreatorsDB: CommentWithCreatorsDB[] =
      await this.commentDataBase.getCommentsWithCreators(id);

    const comments = commentsWithCreatorsDB.map((commentWithCreatorsDB) => {
      const comment = new Comment(
        commentWithCreatorsDB.id,
        commentWithCreatorsDB.content,
        commentWithCreatorsDB.likes,
        commentWithCreatorsDB.dislikes,
        commentWithCreatorsDB.created_at,
        commentWithCreatorsDB.post_id,
        commentWithCreatorsDB.creator_id,
        commentWithCreatorsDB.creator_name
      );
      return comment.toBusinessModel();
    });
    const output: GetCommentsOutputDTO = comments;

    return output;
  };
  public createComment = async (input: CreateCommentInputDTO): Promise<CommentDB> => {
    const { token, content, postId } = input;
    console.log(postId)

    if (token === undefined) {
      throw new BadRequestError("'token' ausente");
    }

    const payload = this.tokenManager.getPayload(token);

    if (payload === null) {
      throw new BadRequestError("Token inválido");
    }

    if (typeof content !== "string") {
      throw new BadRequestError("'content' deve ser string");
    }

    const id = this.idGenerator.generate();
    const createdAt = new Date().toISOString();
    const creatorId = payload.id;
    const creatorName = payload.name;

    const comment = new Comment(
      id,
      content,
      0,
      0,
      createdAt,
      postId,
      creatorId,
      creatorName
    );

    const commentDB = comment.toDBModel();

    await this.commentDataBase.insert(commentDB);

    return commentDB;
  };

  public deleteComment = async (input: DeleteCommentInputDTO): Promise<void> => {
    const { idToDelete, token } = input;

    if (token === undefined) {
      throw new BadRequestError("'token' ausente");
    }

    const payload = this.tokenManager.getPayload(token);

    if (payload === null) {
      throw new BadRequestError("Token inválido");
    }

    const commentDB = await this.commentDataBase.findById(idToDelete);

    if (!commentDB) {
      throw new NotFoundError("'id' não encontrado");
    }

    const creatorId = payload.id;

    if (payload.role !== USER_ROLES.ADMIN && commentDB.creator_id !== creatorId) {
      throw new BadRequestError("Somente quem criou o comentário, pode deletá-lo");
    }

    await this.commentDataBase.delete(idToDelete);
  };
  public likeOrDislikeComment = async (
    input: LikeOrDislikeCommentInputDTO
  ): Promise<void> => {
    const { idToLikeOrDislike, token, like } = input;

    if (token === undefined) {
      throw new BadRequestError("'token' ausente");
    }

    const payload = this.tokenManager.getPayload(token);

    if (payload === null) {
      throw new BadRequestError("Token inválido");
    }

    if (typeof like !== "boolean") {
      throw new BadRequestError("'like' deve ser boolean");
    }

    const commentsWithCreatorDB = await this.commentDataBase.findPostsWithCreatorById(
      idToLikeOrDislike
    );

    if (!commentsWithCreatorDB) {
      throw new NotFoundError("'id' não encontrado");
    }

    const userId = payload.id;
    const likeSQLite = like ? 1 : 0;
    const likeDislikeDB: LikesDislikesCommentsDB = {
      user_id: userId,
      comment_id: commentsWithCreatorDB.id,
      like: likeSQLite,
    };

    const comment = new Comment(
      commentsWithCreatorDB.id,
      commentsWithCreatorDB.content,
      commentsWithCreatorDB.likes,
      commentsWithCreatorDB.dislikes,
      commentsWithCreatorDB.created_at,
      commentsWithCreatorDB.post_id,
      commentsWithCreatorDB.creator_id,
      commentsWithCreatorDB.creator_name
    );

    const commentLikeOrDislike = await this.commentDataBase.findLikeDislike(
      likeDislikeDB
    );

    if (commentLikeOrDislike === COMMENT_LIKE.ALREADY_LIKED) {
      if (like) {
        await this.commentDataBase.removeLikeDislike(likeDislikeDB);
        comment.removeLike();
      } else {
        await this.commentDataBase.updateLikeDislike(likeDislikeDB);
        comment.removeLike();
        comment.addDislike();
      }
    } else if (commentLikeOrDislike === COMMENT_LIKE.ALREADY_DESLIKED) {
      if (like) {
        await this.commentDataBase.updateLikeDislike(likeDislikeDB);
        comment.removeDislike();
        comment.addLike();
      } else {
        await this.commentDataBase.removeLikeDislike(likeDislikeDB);
        comment.removeDislike();
      }
    } else {
      await this.commentDataBase.likeOrDislikeComment(likeDislikeDB);

      if (like) {
        comment.addLike();
      } else {
        comment.addDislike();
      }
    }
    const updatedPostDB = comment.toDBModel();
    await this.commentDataBase.update(idToLikeOrDislike, updatedPostDB);
  };
}
