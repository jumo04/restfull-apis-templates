import { createApp }  from './index.js';
import { MovieModel } from './models/mysql/movies.js';

//esto es inyeccion de dependencias
createApp({ movieModel: MovieModel });