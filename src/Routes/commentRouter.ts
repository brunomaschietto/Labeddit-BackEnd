import express from "express";
import { CommentBusiness } from "../business/CommentBusiness";
import { CommentController } from "../controller/CommentController";
import { CommentDataBase } from "../database/CommentDataBase";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export const commentRouter = express.Router();

const commentController = new CommentController(
  new CommentBusiness(
    new CommentDataBase(),
    new IdGenerator(),
    new TokenManager(),
    new HashManager()
  )
);

commentRouter.get("/", commentController.getAllComments);
commentRouter.post("/", commentController.createComment);
commentRouter.delete("/:id", commentController.deleteComment);
commentRouter.put("/:id/like", commentController.likeOrDislikeComment);
