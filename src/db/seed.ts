import mongoose from "mongoose";
import Movies from "./models/moviesModel";
import dotenv from "dotenv";

dotenv.config();
const seedingData = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error("MongoDB URI is not defined in environment variables.");
    }

    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB successfully.");

    const seedData = [
      {
        title: "test1",
        streamingLink: "testlink1.com",
        genre: "Sci-fi",
        rating: 8.8,
      },
      {
        title: "test2",
        streamingLink: "testlink2.com",
        genre: "Sci-fi",
        rating: 8.6,
      },
      {
        title: "test3",
        streamingLink: "testlink3.com",
        genre: "Sci-fi",
        rating: 8.5,
      },
    ];

    const insertedMovies = await Movies.insertMany(seedData);
    console.log(`Inserted ${insertedMovies.length} movies successfully.`);
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
};

seedingData();
