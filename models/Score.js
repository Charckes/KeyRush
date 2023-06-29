import { model, models, Schema } from 'mongoose';

const ScoreSchema = new Schema({
    userId: {type: String, required: true},
    score: {type: Number, required: true},
    errorCount: {type: Number, required: true },

})

export const Score = models.Score || model('Score', ScoreSchema)