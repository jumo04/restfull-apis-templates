import movies from '../../movies.json' with { type: 'json'};// esta es experimental por ahora.
import { randomUUID }   from 'node:crypto';

export class MovieModel{
    static async getAll({ genre }){
        if (genre) {
            return  movies.filter(m => m.genre.some(g => g.toLowerCase() === genre.toLowerCase()));
        }
        return movies;
    }

    static async getById( { id } ) {
        const movie = movies.find(movie => movie.id === id);
        return movie;
    }

    static async create({input}){
        const newMovie = {
            id: randomUUID(),
           ...input
        }
        movies.push(newMovie);
        return newMovie;
    }

    static async delete({ id }) {
        const index = movies.findIndex(movie => movie.id === id);
        if (index === -1) return false
        movies.splice(index, 1);
        return true;
    }

    static async update({ id, input }){
        const movieIndex = movies.findIndex(m => m.id === id);
        if (movieIndex === -1) return false;
        movies[movieIndex] = {
            ...movies[movieIndex],
            ...input
        }
        return movies[movieIndex];
    }
}