import { Schema } from "mongoose";

const WeddingNotes = new Schema({
    budget:String,
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
    registry: String
})

export default WeddingNotes