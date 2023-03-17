import express from "express";
import { CommentBusiness } from "../business/CommentBusiness";
import { PostBusiness } from "../business/PostBusiness";
import { CommentController } from "../controller/CommentController";
import { PostDataBase } from "../database/PostDataBase";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export const commentRouter = express.Router();

const commentController = new CommentController(
  new CommentBusiness(
    new PostDataBase(),
    new IdGenerator(),
    new TokenManager(),
    new HashManager()
  )
);

commentRouter.get("/", commentController.getAllPosts);
commentRouter.post("/", commentController.createPost);
commentRouter.put("/:id", commentController.editPost);
commentRouter.delete("/:id", commentController.deletePost);
commentRouter.put("/:id/like", commentController.likeOrDislikePost);
