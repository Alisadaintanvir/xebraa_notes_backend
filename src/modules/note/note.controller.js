const Note = require("@/schemas/note.schema");

const getNotes = async (req, res, next) => {
  const notes = await Note.find({}).populate("author");
  res.status(200).json({ message: "Notes fetched successfully!", data: notes });
};

const postCreateNote = async (req, res, next) => {
  const { title, content } = req.body;
  const note = await Note.create({ title, content, author: req.user._id });
  if (!note)
    return next(createHttpError(400, "Error creating note, try again!"));

  res.status(201).json({ message: "Note created successfully!", data: note });
};

module.exports = { getNotes, postCreateNote };
