import { Router } from "express";
import moviesRouter from "./moviesRouter";

const router = Router();

router.use("/", moviesRouter);

export default router;
