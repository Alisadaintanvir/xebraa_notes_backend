const { Router } = require("express");
const {
  getNotes,
  postCreateNote,
  patchUpdateNote,
  deleteNote,
  getNoteById,
} = require("./note.controller");
const withErrorHandling = require("../../utility/withErrorHandling");
const { authenticateToken } = require("../../middlewares/auth.middleware");
const { createNoteValidator } = require("./note.validator");
const { validationHandler } = require("../../helpers/errorHandler");

const router = Router();

router.get("/", authenticateToken, withErrorHandling(getNotes)); // get all notes

router.get("/:id", authenticateToken, withErrorHandling(getNoteById)); // get note by id

// create note route
router.post(
  "/create",
  authenticateToken,
  createNoteValidator,
  validationHandler,
  withErrorHandling(postCreateNote)
);

// update note route
router.patch("/:id", authenticateToken, withErrorHandling(patchUpdateNote));

router.delete("/:id", authenticateToken, withErrorHandling(deleteNote));

module.exports = router;
