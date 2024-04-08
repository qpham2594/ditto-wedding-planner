import User from '../db/models/user'
import dbConnect from '../db/connection'

const WeddingNotesController = {

  // Create
  async create(req, res) {
    await dbConnect();
    try {
      const { userId } = req.query;
      const { body: weddingNotes } = req;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      user.notes.push(weddingNotes);
      await user.save();
      return res.status(201).json(user.notes);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Get
  async get(req, res) {
    await dbConnect();
    try {
      const { userId } = req.query;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(user.notes);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Update
  async update(req, res) {
    await dbConnect();
    try {
      const { userId, noteId } = req.query;
      const { body: updatedNotes } = req;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const noteIndex = user.notes.findIndex(note => note._id == noteId);
      if (noteIndex === -1) {
        return res.status(404).json({ message: "Note not found" });
      }
      user.notes[noteIndex] = updatedNotes;
      await user.save();
      return res.status(200).json(user.notes);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Delete
  async delete(req, res) {
    await dbConnect();
    try {
      const { userId, noteId } = req.query;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      user.notes = user.notes.filter(note => note._id != noteId);
      await user.save();
      return res.status(200).json(user.notes);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export default WeddingNotesController;
