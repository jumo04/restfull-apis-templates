const http = require('node:http');

const processRequest = (req, res) => {
    const { method, url } = req;

    const dittoJSON = require('./pokemon/dito.json');

    switch (method) {
        case 'GET':
            switch (url) {
                case '/pokemon/ditto':
                    res.setHeader('Content-Type', 'application/json; charset=utf-8');
                    return res.end(JSON.stringify(dittoJSON));
                default:
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html; charset=utf-8');
                    return res.end('<h1>404</h1>');
            }

        case 'POST':
            switch (url) {
                case '/poke':
                    {
                    let body = '';
                    req.on('data', chunk =>{
                        body += chunk.toString();
                    })

                    req.on('end', () =>{
                        const pokemon = JSON.parse(body);
                        //aca se llama una base de datos para guardar la info orm
                        res.writeHead(201, {'Content-Type': 'application/json; charset=utf-8'});
                        pokemon.timestamp = Date.now();
                        return res.end(JSON.stringify(pokemon));
                    })
                  }
                default:
                    // res.statusCode = 404;
                    // res.setHeader('Content-Type', 'text/plain; charset=utf-8');
                    // return res.end('Not Found');
            }
    }
     
}

const server = http.createServer(processRequest)

server.listen(1234, () => {
    console.log(`Server listening on port http://localhost:1234`)
})