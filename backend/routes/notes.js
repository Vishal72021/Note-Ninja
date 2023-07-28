import express from "express";
import { validationResult, body } from "express-validator";
import Note from "../models/Note.js";
import fetchUser from "../middleware/fetchUser.js";

const router = express.Router();

// Endpoint for finding all notes
router.get("/findAllNotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occurred while finding notes");
  }
});

// Endpoint for adding a new note
router.post(
  "/addNote",
  fetchUser,
  [
    body("title", "Title should be minimum 3 characters long").isLength({
      min: 3,
    }),
    body(
      "description",
      "Description should be minimum 5 characters long"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      try {
        const { title, description, tag } = req.body;
        const note = new Note({
          title,
          description,
          tag,
          user: req.user.id,
        });
        const savedNote = await note.save();

        res.json(savedNote);
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred while adding a note");
      }
    } else {
      res.send({ errors: result.array() });
    }
  }
);

// Endpoint for updating an existing note
router.put(
  "/updateNote/:id",
  fetchUser,
  [
    body("title", "Title should be minimum 3 characters long").isLength({
      min: 3,
    }),
    body(
      "description",
      "Description should be minimum 5 characters long"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      try {
        const { title, description, tag } = req.body;
        const newNote = {};

        if (title) {
          newNote.title = title;
        }
        if (description) {
          newNote.description = description;
        }
        if (tag) {
          newNote.tag = tag;
        }

        let note = await Note.findById(req.params.id);

        if (!note) {
          return res.status(404).send("Note not found");
        }
        if (note.user.toString() !== req.user.id) {
          return res.status(401).send("Unauthorized access");
        }

        note = await Note.findByIdAndUpdate(
          req.params.id,
          { $set: newNote },
          { new: true }
        );

        res.json({ note });
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred while updating the note");
      }
    } else {
      res.send({ errors: result.array() });
    }
  }
);

// Endpoint for deleting an existing note
router.delete("/deleteNote/:id", fetchUser, async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).send("Note not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Unauthorized access");
    }

    note = await Note.findByIdAndDelete(req.params.id);

    res.json({ Success: "The note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occurred while deleting the note");
  }
});

export default router;
