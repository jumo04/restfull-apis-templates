import { Router } from "express";
import { MovieController } from "../controllers/movies.controller.js";

export const moviesRouter = Router();

moviesRouter.get("/", MovieController.getAll);
moviesRouter.get('/:id', MovieController.getById);

moviesRouter.post('/', MovieController.create);
moviesRouter.delete('/:id', MovieController.delete)
moviesRouter.patch('/movies/:id', MovieController.update)