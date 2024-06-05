
import { z } from "zod";

const movieSchema = z.object({
    title: z.string({invalid_type_error: 'Movie title mustbe a string',
                     required_error: 'Movie title is required.'}),
    year: z.number().int().min(1900).max(2024),
    genre: z.array(z.enum(['Action', 'Adventure', 'Crime', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi']),{
        required_error: 'Movie is requiered',
        invalid_type_error:' Movie must be an array of those string '
    }),
    director: z.string(),
    duration: z.number().int().positive(),
    rate: z.number().min(0).max(10).default(5.5),
    poster: z.string().url({message: 'Poster must be a valid URL'}).endsWith('')
})

export function validateMovie(object) {
    return movieSchema.safeParse(object);
    
}

export function validatePartialMovie(object) {
    return movieSchema.partial().safeParse(object);
}