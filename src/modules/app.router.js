const { Router } = require("express");

const authRouter = require("./auth/auth.routes");
const noteRouter = require("./note/note.routes");

const router = Router();

router.use("/auth", authRouter);
router.use("/notes", noteRouter);

module.exports = router;
