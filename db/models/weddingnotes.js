import { Schema, model, models } from 'mongoose'

const WeddingNotes = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    budget: String,
    guests: String,
    venue: String,
    theme: String,
    caterers: String,
    alcohol: String,
    vendors: String,
    rentals: String,
    dress: String,
    suit: String,
    florals: String,
    transportation: String,
    cake: String,
    invitations: String,
    decor: String,
    bridesmaids: String,
    groomsmen: String,
    lodging: String,
    registry: String,
    photographer: String,
    music: String
});

export default models.WeddingNotes || model('WeddingNotes', WeddingNotes)
