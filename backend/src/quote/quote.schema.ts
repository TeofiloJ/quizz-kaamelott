import * as mongoose from 'mongoose';
export const QuoteSchema = new mongoose.Schema({
    id: Number,
    text: String,
    actor: String,
    author: String,
    season: String,
    episode: String,
    character: String,


})