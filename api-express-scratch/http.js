const http = require('node:http'); 

const desirePort = process.env.PORT ?? 1234

const processRequest = (req, res) => {
    console.log('Request recived', req.url);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    if (req.url === '/') {
        res.statusCode = 200;
        res.end('<h1>Bienvenido a mi pagina de inicio</h1>')
    }
    else if(req.url === '/contacto'){
        res.statusCode = 200;
        res.end('<h1>Contacto</h1>')
    }else{
        res.statusCode = 404;
        res.end('<h1>404</h1>'); 
    }
}

const server = http.createServer(processRequest);
 
//request: estructura de una peticion lo que contiene headers, urls, method, body
//headers: informacion relevante para la peticion, en los headers se mandan las cookies


//response: que trae statusCode, body, headers 

//statusCode: 
//100-199: respuestas informativas
//200-299: respuestas exitosas 
//300-399: redirecciones
//400-499: errores del cliente
//500-599: errores del servidor

server.listen(desirePort, ()=>{
    console.log(`Server listening on port http://localhost:${desirePort}`);
})