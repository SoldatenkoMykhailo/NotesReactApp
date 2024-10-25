/* eslint-disable */

const express = require("express");
const {
  createNote,
  getUserNotes,
  getNoteById,
  updateNote,
  deleteNote,
} = require("../controllers/notesController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/notes", authMiddleware, createNote);

router.get("/notes", authMiddleware, getUserNotes);

router.get("/notes/:id", authMiddleware, getNoteById);

router.put("/notes/:id", authMiddleware, updateNote);

router.delete("/notes/:id", authMiddleware, deleteNote);

module.exports = router;
