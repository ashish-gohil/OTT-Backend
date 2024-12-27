import mongoose from "mongoose";

// movie data format
// {
//     "_id": "abc123",
//     "title": "asdf",
//     "genre": "Sci-Fi",
//     "rating": 8.8,
//     "streamingLink": "https://example.com/asdf"
//   }

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    genre: { type: String, enum: ["Sci-fi", "Romantic", "Documentry"] },
    rating: { type: Number, min: 0, max: 10 },
    streamingLink: String,
  },
  { timestamps: true }
);
const Movies = mongoose.model("Movie", schema);

export default Movies;
