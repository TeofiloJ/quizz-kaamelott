import * as mongoose from 'mongoose';
export const QuoteSchema = new mongoose.Schema({
    quote: String,
    actor: String,
    author: String,
    season: String,
    episode: String,

})