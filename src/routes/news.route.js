import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
import {
  validId,
  validNews,
  verifyNewsOwner,
} from "../middlewares/global.middlewares.js";


import {
  create,
  findAll,
  topNews,
  findById,
  searchByTitle,
  byUser,
  update,
  deleteById,
  likeNews,
  addComments,
  deleteComments,
} from "../controllers/news.controller.js";

const router = Router();

router.post("/", authMiddleware, create);
router.get("/", findAll);
router.get("/top", topNews);
router.get("/search", searchByTitle);
router.get("/byUser", authMiddleware, byUser);
router.get("/:id", authMiddleware, validId, validNews, findById);

router.patch(
  "/:id",
  authMiddleware,
  validId,
  validNews,
  verifyNewsOwner,
  update
);
router.delete(
  "/:id",
  authMiddleware,
  validId,
  validNews,
  verifyNewsOwner,
  deleteById
);
router.patch("/like/:id", authMiddleware, validId, validNews, likeNews); //like
router.patch("/comment/:id", authMiddleware, validId, validNews, addComments); //add comments
router.patch("/comment/:id/:commentId", authMiddleware, validId, validNews, deleteComments); //add comments

export default router;
