const  express = require("express");
const swaggerUI = require("swagger-ui-express");
const swaggerJson = require("../swagger.json");

const router = express.Router();

router.use("/", swaggerUI.serve);
router.get("/", swaggerUI.setup(swaggerJson));

module.exports = router;
