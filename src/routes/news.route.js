import { Router } from "express";
import newsController from "../controllers/news.controller.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";
import { validId, validNews } from "../middlewares/global.middlewares.js";

const router = Router();


router.post("/", authMiddleware, newsController.create);
router.get("/", newsController.findAll);
router.get("/top", newsController.topNews)
router.get("/:id", validId, validNews, newsController.findById);


export default router;