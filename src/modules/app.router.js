const { Router } = require("express");

const authRouter = require("@/modules/auth/auth.routes");
const noteRouter = require("@/modules/note/note.routes");

const router = Router();

router.use("/auth", authRouter);
router.use("/notes", noteRouter);

module.exports = router;
