const express = require('express');
const Note = require('../models/Note');

const router = express.Router();

router.post('/', async (req, res) => {
  const { title, content, author } = req.body;
  const note = new Note({ title, content, author });
  await note.save();
  res.status(201).send(note);
});

router.get('/', async (req, res) => {
  const notes = await Note.find();
  res.send(notes);
});

router.put('/:id', async (req, res) => {
  const { title, content } = req.body;
  const note = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
  res.send(note);
});

router.delete('/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;