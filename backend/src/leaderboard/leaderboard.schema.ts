import * as mongoose from 'mongoose';
export const LeaderboardSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.ObjectId, auto: true },
    name: String,
    score: Number
})