import { Request, Response } from "express";
import { CommentBusiness } from "../business/CommentBusiness";
import { CreatePostInputDTO, DeletePostInputDTO, GetPostsInputDTO, LikeOrDislikePostInputDTO } from "../dtos/userDTO";
import { BaseError } from "../errors/BaseError";

export class CommentController {
  constructor(private commentBusiness: CommentBusiness) {}
  public getAllComments = async (req: Request, res: Response) => {
    try {
      const input: GetPostsInputDTO = {
        token: req.headers.authorization
      };

      const output = await this.commentBusiness.getAllComments(input);
      
      res.status(200).send(output);
    } catch (error) {
      console.log(error);

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };
  public createComment = async (req: Request, res: Response) => {
    try {
      const input: CreatePostInputDTO = {
        token: req.headers.authorization,
        content: req.body.content
      }

      const output = await this.commentBusiness.createComment(input)
      res.status(201).end()
    } catch (error) {
      console.log(error);

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };
  public deleteComment = async (req: Request, res: Response) => {
    try {
      const input: DeletePostInputDTO = {
        idToDelete: req.params.id,
        token: req.headers.authorization
      }

      await this.commentBusiness.deleteComment(input)
      res.status(200).send("Post deletado com sucesso!")
    } catch (error) {
      console.log(error);

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };
  public likeOrDislikeComment = async (req: Request, res: Response) => {
    try {
      const input: LikeOrDislikePostInputDTO = {
        idToLikeOrDislike: req.params.id,
        token: req.headers.authorization,
        like: req.body.like
      }
      await this.commentBusiness.likeOrDislikeComment(input)
      res.status(200).end()
    } catch (error) {
      console.log(error);

      if (error instanceof BaseError) {
        res.status(error.statusCode).send(error.message);
      } else {
        res.status(500).send("Erro inesperado");
      }
    }
  };
}
