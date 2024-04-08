import WeddingNotesController from '../../db/weddingnotes'
import dbConnect from '../../db/connection'

export default function handler(req, res) {
  dbConnect();
  const { method } = req;

  switch (method) {
    case 'POST':
      WeddingNotesController.create(req, res);
      break;
    case 'GET':
      WeddingNotesController.get(req, res);
      break;
    case 'PUT':
      WeddingNotesController.update(req, res);
      break;
    case 'DELETE':
      WeddingNotesController.delete(req, res);
      break;
    default:
      res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
