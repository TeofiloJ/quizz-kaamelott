import * as mongoose from 'mongoose';
export const LeaderboardSchema = new mongoose.Schema({
    name: String,
    score: Number
})