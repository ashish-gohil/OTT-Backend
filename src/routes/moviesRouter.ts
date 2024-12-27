import { Router } from "express";
import {
  addMovie,
  deleteMovie,
  updateMovie,
  getMovies,
  searchMovies
} from "../helpers/moviesHelper";

const moviesRouter = Router();

moviesRouter.get("/search", searchMovies);
moviesRouter.get("/movies", getMovies); 
moviesRouter.post("/movies", addMovie);
moviesRouter.put("/movies/:id", updateMovie);
moviesRouter.delete("/movies/:id", deleteMovie);

//ideally all endpoint have middlewar attached to check weather user is authorized to perform action
//payload validator middleware to check weather body is valid
// auth middelware to check only admin person can update/add/delete data

export default moviesRouter;
