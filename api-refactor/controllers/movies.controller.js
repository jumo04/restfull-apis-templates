import { MovieModel } from "../models/local-file-system/movie.js";
import { validateMovie, validatePartialMovie } from '../schemas/movies.js';

export class MovieController {
    static async getAll(req, res){
        const { genre } = req.query;
        const movies = await MovieModel.getAll({ genre });
        res.json(movies);
    }

    static async getById(req, res){
        const { id } = req.params;
        const movie = await MovieModel.getById({ id });
        if (!movie) res.status(404).json({mesage: "Movie not found"}); 

        return res.json(movie) 
    }

    static async create(req, res){
        const result = validateMovie(req.body);
    
        if (result.error) {
            return res.status(400).json({error: JSON.parse(result.error.message)});
            
        }
    
        const newMovie = await MovieModel.create({input: result.data});
    
        res.status(201).json(newMovie);
    }

    static async delete(req, res){
        //lo que hace cors esta en los comentarios, validar si el origin es aceptado y permite el acces control allow origin
        // const origin = req.header('origin');
        // if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
        //     res.header('Access-Control-Allow-Origin', origin);
        // }
        const { id } = req.params
        const result = await MovieModel.delete({ id });
        if (!result) {
            return res.status(404).json({mesage: "Movie not found"});
        }
        res.status(204).json({ message: "Movie deleted"});
    
    }

    static async update (req, res){
        const { id } = req.params;
        const result = validatePartialMovie (req.body);
        if (!result.success) {
            return res.status(400).json({error: JSON.parse(result.error.message)}); 
        }

        const updateMovie = await MovieModel.update({ id, input: result.data });
    
        return res.json(updateMovie);
        
    }
}