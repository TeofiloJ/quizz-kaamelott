export interface Quote extends Document {
    readonly id: Number,
    readonly text: String,
    readonly  actor: String,
    readonly author: String,
    readonly season: String,
    readonly episode: String,
    readonly character: String,
 }