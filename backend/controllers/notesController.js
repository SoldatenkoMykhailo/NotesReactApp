/* eslint-disable */

const Note = require("../models/Note");

const createNote = async (req, res) => {
  const { title, content, image } = req.body;
  const userId = req.user.userId;
  try {
    const note = new Note({ title, content, image, userId });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ message: "Error creating note", error: err });
  }
};

const getUserNotes = async (req, res) => {
  const userId = req.user.userId;
  try {
    const notes = await Note.find({ userId });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving notes", error: err });
  }
};

const getNoteById = async (req, res) => {
  const noteId = req.params.id;
  const userId = req.user.userId;

  try {
    const note = await Note.findOne({ _id: noteId, userId });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving note", error: err });
  }
};

const updateNote = async (req, res) => {
  const noteId = req.params.id;
  const userId = req.user.userId;
  const { title, content, image } = req.body;

  try {
    const note = await Note.findOneAndUpdate(
      { _id: noteId, userId },
      { title, content, image, updatedAt: Date.now() },
      { new: true },
    );

    if (!note) {
      return res
        .status(404)
        .json({ message: "Note not found or you are not authorized" });
    }

    res.status(200).json(note);
  } catch (err) {
    res.status(400).json({ message: "Error updating note", error: err });
  }
};

const deleteNote = async (req, res) => {
  const noteId = req.params.id;
  const userId = req.user.userId;

  try {
    const note = await Note.findOneAndDelete({ _id: noteId, userId });

    if (!note) {
      return res
        .status(404)
        .json({ message: "Note not found or you are not authorized" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting note", error: err });
  }
};

module.exports = {
  createNote,
  getUserNotes,
  getNoteById,
  updateNote,
  deleteNote,
};
