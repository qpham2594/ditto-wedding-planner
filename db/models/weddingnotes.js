import { Schema, model, models } from 'mongoose'

const WeddingNotes = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    date: String,
    budget: String,
    guests: String,
    venue: String,
    caterers: String,
    clothing: String,
    cake: String,
    bridalparty: String,
    lodging: String,
    registry: String,
    expenses: String
});

export default models.WeddingNotes || model('WeddingNotes', WeddingNotes)
