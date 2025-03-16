const Note = require("@/schemas/note.schema");
const createHttpError = require("http-errors");

// get all notes
const getNotes = async (req, res, next) => {
  const notes = await Note.find({}).populate("author", "name");
  res.status(200).json({ message: "Notes fetched successfully!", data: notes });
};

// get a single note by id
const getNoteById = async (req, res, next) => {
  const note = await Note.findById(req.params.id).populate("author", "name");
  if (!note) return next(createHttpError(404, "Note not found!"));
  res.status(200).json({ message: "Note fetched successfully!", data: note });
};

// create note
const postCreateNote = async (req, res, next) => {
  const { title, content } = req.body;
  const note = await Note.create({ title, content, author: req.user._id });
  if (!note)
    return next(createHttpError(400, "Error creating note, try again!"));

  res.status(201).json({ message: `Note created successfully!` });
};

// update note
const patchUpdateNote = async (req, res, next) => {
  const { title, content } = req.body;
  const note = await Note.findByIdAndUpdate(req.params.id, { title, content });
  if (!note)
    return next(createHttpError(400, "Error updating note, try again!"));

  res
    .status(200)
    .json({ message: `Note Id: ${req.params.id} updated successfully!` });
};

// delete note
const deleteNote = async (req, res, next) => {
  const note = await Note.findByIdAndDelete(req.params.id);
  if (!note) return next(createHttpError(400, "Note not found, try again!"));

  res
    .status(200)
    .json({ message: `Note Id: ${req.params.id} deleted successfully!` });
};

module.exports = {
  getNotes,
  getNoteById,
  postCreateNote,
  patchUpdateNote,
  deleteNote,
};
