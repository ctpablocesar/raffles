import mongoose from 'mongoose'

const DataSchema = new mongoose.Schema(
  {
    SOLD_NUMBERS: Array,
    PRICE_PER_NUMBER: Number,
    DRAW_DATE: Date,
    WINNING_NUMBER: Number,
    AWARD: String,
    PHONE_NUMBER: String
  },
  { timestamps: true }
)

export default mongoose.models.Data || mongoose.model('Data', DataSchema)
