import dbConnect from '../../db/connection'
import WeddingNotes from '../../db/models/weddingnotes';

dbConnect();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Create wedding note
    try {
      const { userId, ...noteData } = req.body;
      const createWeddingNote = new WeddingNotes({ userId, ...noteData });
      await createWeddingNote.save();
      res.status(201).json(createWeddingNote);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === 'GET') {
    // Get wedding notes by user ID - ie: http://localhost:3000/api/weddingnotes?userId=65cbb9a6f1dac5902082f630
    try {
      const { userId } = req.query;
      const getWeddingNotes = await WeddingNotes.find({ userId });
      res.json(getWeddingNotes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === 'PUT') {
    // Update wedding note by note id - example: http://localhost:3000/api/weddingnotes?id=66155a93ab405ff2b9220f10
    try {
      const { id } = req.query;
      const updatedWeddingNotes = await WeddingNotes.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json(updatedWeddingNotes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else if (req.method === 'DELETE') {
    // Remove wedding note by note id - example: http://localhost:3000/api/weddingnotes?id=66154f21ab405ff2b9220f03
    try {
      const { id } = req.query;
      await WeddingNotes.findByIdAndDelete(id);
      res.json({ message: 'Wedding note deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

// tested on Postman for CRUD - return 200 OK for CRUD operations