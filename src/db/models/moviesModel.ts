import mongoose from "mongoose";

// movie data format
// {
//     "_id": "642f4a89c16e3b001c1e4a67",
//     "title": "Inception",
//     "genre": "Sci-Fi",
//     "rating": 8.8,
//     "streamingLink": "https://example.com/inception"
//   }

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  genre: { type: String, enum: ["Sci-fi", "Romantic", "Documentry"] },
  rating: { type: Number, min: 0, max: 10 },
  streamingLink: String,
});
export const Movies = mongoose.model("Movie", schema);
