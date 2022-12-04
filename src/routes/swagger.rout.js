import { Router } from "express";
import swaggerUI from "swagger-ui-express";
import swaggerJson from "../swagger.json"

const router = Router();


router.use("/", swaggerUI.serve)
router.get("/", swaggerUI.setup(swaggerJson))

export default router;

