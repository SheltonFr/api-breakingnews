import { Router } from "express";
import {create, findAll, topNews, findById, searchByTitle, byUser, update, deleteById} from "../controllers/news.controller.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
import { validId, validNews, verifyNewsOwner } from "../middlewares/global.middlewares.js";

const router = Router();


router.post("/", authMiddleware, create);
router.get("/", findAll);
router.get("/top", topNews)
router.get("/search", searchByTitle);
router.get("/byUser", authMiddleware, byUser)
router.get("/:id", authMiddleware, validId, validNews, findById);
router.patch("/:id", authMiddleware, validId, validNews, verifyNewsOwner, update);
router.delete("/:id", authMiddleware, validId, validNews, verifyNewsOwner, deleteById);


 
export default router;