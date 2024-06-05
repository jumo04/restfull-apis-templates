// const express = require('express');//commonJs sistema de modulos clasico funciona pero es mejor la e6
import express, { json } from 'express';//
import { moviesRouter } from './routes/movies.js';
import { corsMiddleware } from './middlewares/cors.js';

// import fs from 'node:fs'; forma de importar archivos e importar un json
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf8'));

//Como leer un json en EsModules recomendado pero es mejor con el with que ya es estable, como crear un require

// import { createRequire } from 'node:module';
// const require = createRequire(import.meta.url);
// const movies = require('./movies.json');


const app = express();


app.use(json());
app.disable('x-powered-by');

app.use(corsMiddleware());//importando desde la carpeta de middlewares cambiando la arquitectura

app.use('/movies', moviesRouter);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//forma de hacerlo con cors dentro del codigo
// app.use(cors({
//     // origin: (origin, callback) =>{
//     //     const ACCEPTED_ORIGINS =
//     // ['http://localhost:8080', 'http://localhost:1234', 'https://movies.com', 'https://midu.dev' ]

//     // if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
//     //     callback(null, true);
//     // }else{
//     //  return callback(new Error('Not allowed by CORS'));
//     //  }
//     // }
// })

// )



// metodos normales : GET/HEAD/POST
// metodos compeljos: PUT/PATCH/DELETE

//
//OPTIONS: 


// app.get('/', (req, res) => {
//     console.log("hace la peticion+");
//     res.json({message: 'hola mundo'});
// })

// app.get('/movies', (req, res) => {
//     // const origin = req.header('origin');
//     // if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
//     //     res.header('Access-Control-Allow-Origin', origin);
//     // }
//     res.json(movies);
// })

// app.delete('/movies/:id', (req, res) => {
//     //lo que hace cors esta en los comentarios, validar si el origin es aceptado y permite el acces control allow origin
//     // const origin = req.header('origin');
//     // if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
//     //     res.header('Access-Control-Allow-Origin', origin);
//     // }
//     const { id } = req.params
//     const index = movies.findIndex(m => m.id === id);
//     if (index === -1) return res.status(404).json({mesage: "Movie not found"});
//     movies.splice(index, 1);

//     res.status(204).json({message: "Movie deleted"});

// })

// app.post('/movies', (req, res) => {
//     const result = validateMovie(req.body);

//     if (result.error) {
//         return res.status(400).json({error: JSON.parse(result.error.message)});
        
//     }
//     //lo que hacemos en base de datos
//     const newMovie = {
//         id: randomUUID(),
//         ...result.data
//     }

//     movies.push(newMovie);
//     res.status(201).json(newMovie);
// });


// app.get('/movies/:id', (req, res) => {
//     const { id } = req.params;
//     const movie = movies.find(m => m.id === id);
//     if (movie) return res.json(movie) 
    
//     res.status(404).json({mesage: "Movie not found"});
// })

// app.get('/movies', (req, res) =>{
//     const { genre } = req.query;
//     if(genre){
//         // const movies = movies.filter(m => m.genre.includes(genre));//case sensitive
//         const moviess = movies.filter(m => m.genre.some(g => g.toLowerCase() === genre.toLowerCase()));
//         if (moviess) return res.json(moviess);
//     }

// })
//Post: crear elemento o recurso dentro del servidor, no es idempotente porque siempre creas un nuevo recurso
//PUT:Actualizar un elemento existente o crear si no existe, Si es idempotente, el resultado siempre sera el mismo
//PATCH:Actualizar parcialmente un elemento existente, normalmente si lo podria ser pero depende del updateat

// app.patch('/movies/:id', (req, res) => {
//     const { id } = req.params;
//     const result = validatePartialMovie (req.body);
//     const movieIndex = movies.findIndex(m => m.id === id);
//     if (movieIndex === -1) {
//         return res.status(404).json({message: 'Movie not found'})
//     }

//     if (!result.success) {
//         return res.status(400).json({error: JSON.parse(result.error.message)});
//     }

//     const updateMovie = {
//         ...movies[movieIndex],
//         ...result.data
//     }

//     movies[movieIndex] = updateMovie;

//     return res.json(updateMovie);
    
// })

//en una api rest puede estar representado en diferentes formatos,
//el cliente deberia poder decidir sobre cual representacion usar para el recurso
//el cliente debe de enviar toda la informacion necesaria para procesar la request
//Separacion de conceptos, los componenetes estan separados. permite que cliente y servidor manejen de forma separada
//no todas las api son rest, hay diferentes arquitecturas. como SOAP. o graph ql


// app.options('/movies/:id', (req, res) => {
//     // const origin = req.header('origin');
//     // if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
//     //     res.header('Access-Control-Allow-Origin', origin);
//     //     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
//     // }
//     res.sendStatus(200);
// })


