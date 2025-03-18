const { Router } = require("express");
const appRouter = require("../modules/app.router");
const router = Router();

router.use("/v1", appRouter);

module.exports = router;
