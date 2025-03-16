const { Router } = require("express");
const { getNotes } = require("./note.controller");
const withErrorHandling = require("@/utility/withErrorHandling");
const { authenticateToken } = require("@/middlewares/auth.middleware");

const router = Router();

router.get("/", authenticateToken, withErrorHandling(getNotes));

module.exports = router;
