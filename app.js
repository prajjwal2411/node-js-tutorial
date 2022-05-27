const http = require('http');
const fs = require('fs');

//createserver creates a listener
const server = http.createServer((req, res) => {
    const url = req.url;
    if(url === '/'){
        res.write
        (`
        <html>
            <head>
                <title>Enter Message</title>
            </head>
            <body>
                <form action="/message" method="POST">
                    <input type="text" name="message">
                    <button type="submit">Send</button>
                </form>
            </body>
        </html>
        `);
        return res.end();    
    }
    if(url === '/message' && req.method === 'POST'){
        
        //This method is always fired whenever there are chunks of data is ready to be read('data' is an event, similir to onClick)
        //The function is always executed for every data event
        const body = []
        req.on('data', (chunk) => {
            console.log(chunk)
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            //Sync stands for synchronous -> It means that Sync function blocks the code execution until the operation performed by sync function is completed.
            //We will receive null in err if no error is occured
            fs.writeFile('message.text', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
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