import { Request, Response } from "express";
import Movie from "../db/models/moviesModel"; // Import your Movie Mongoose model

export const getMovies = async (req: Request, res: Response): Promise<void> => {
  try {
    const movies = await Movie.find({});
    if (movies.length === 0) {
      res.status(404).json({ message: "No movies found in the lobby." });
      return;
    }
    res.status(200).json(movies);
  } catch (error: unknown) {
    console.error("Error fetching movies:", error);
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: `Error fetching movies: ${error.message}` });
    } else {
      res.status(500).json({
        message: "An unexpected error occurred while fetching movies.",
      });
    }
  }
};

// Add movie
export const addMovie = async (req: Request, res: Response) => {
  try {
    const { title, genre, rating, streamingLink } = req.body;

    if (!title || !genre || !rating || !streamingLink) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const newMovie = new Movie({ title, genre, rating, streamingLink });
    const savedMovie = await newMovie.save();

    res
      .status(201)
      .json({ message: "Movie added successfully", movie: savedMovie });
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error adding movie", error: error?.message });
  }
};

// Update movie
export const updateMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, genre, rating, streamingLink } = req.body;

    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      { title, genre, rating, streamingLink },
      { new: true, runValidators: true } // Return updated document and run validation
    );

    if (!updatedMovie) {
      res.status(404).json({ message: "Movie not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "Movie updated successfully", movie: updatedMovie });
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error updating movie", error: error.message });
  }
};

// Delete a movie
export const deleteMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedMovie = await Movie.findByIdAndDelete(id);

    if (!deletedMovie) {
      res.status(404).json({ message: "Movie not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "Movie deleted successfully", movie: deletedMovie });
  } catch (error: any) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error deleting movie", error: error?.message });
  }
};

//seqarch moview based on title or generes
export const searchMovies = async (
  req: Request,
  res: Response
): Promise<string | any> => {
  try {
    const query = req.query.q;
    if (!query) {
      return res
        .status(400)
        .json({ message: "Query parameter 'q' is required." });
    }

    const movies = await Movie.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { genre: { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).json(movies);
  } catch (error: any) {
    console.error("Error searching movies:", error);
    res
      .status(500)
      .json({ message: "Internal server error.", error: error?.message });
  }
};
