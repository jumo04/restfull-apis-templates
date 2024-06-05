
const express = require("express");
const app = express();
const ditto = require('./pokemon/dito.json');

app.disable('x-powered-by');
const PORT = process.env.PORT || 1234;


app.use(express.json());
//lo comentado es el codigo que hace express.json crear el middleware mutar la peticion y colocarla en el body como un json

// app.use((req, res, next) => {
//     // console.log("mi primer middlewate");
//     if (req.method != 'POST') return next() 
//     if (req.headers['content-type'] != 'application/json') return next()
    
//     //para todas las peticiones que sean post y que tengan un aplication json de contenido
//     let body = '';
//     req.on('data', chunk =>{
//         body += chunk.toString();
//     })

//     req.on('end', () =>{
//         const pokemon = JSON.parse(body);
//         //mutar la request y meter la informacion en el req.body
//         pokemon.timestamp = Date.now();
//         req.body = pokemon;
//         next();
//     })

//     //trackear todo lo que se necesite 
//     //puede servir para saber si el usuario tiene cookies
// })

app.get('/pokemon/ditto', (req, res) =>{
    res.json(ditto)
});

app.post('/poke', (req, res) =>{
    //con el body debemos de guardar los datos  
    res.status(201).json(req.body);
})

app.use((req, res) => {
    res.status(404).send('<h1>Error 404</h1>')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});