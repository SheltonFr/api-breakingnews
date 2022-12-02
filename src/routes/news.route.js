import { Router } from "express";
import newsController from "../controllers/news.controller.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";

const router = Router();


router.post("/", authMiddleware, newsController.create);
router.get("/", newsController.findAll);


export default router;