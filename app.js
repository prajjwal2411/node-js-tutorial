const http = require('http');

//createserver creates a listener
const server = http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers);
    res.setHeader('Content-Type', 'text/html');
    res.write
    (`
        <html>
            <head>
                <title>My First Page</title>
            </head>
            <body>
                <h1>Hello from NodeJS Server!</h1>
            </body>
        </html>
    `);
    res.end();
});

server.listen(3000);