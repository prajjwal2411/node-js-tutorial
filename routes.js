const fs = require('fs');

const requestHandler = (req, res) => {

    const url = req.url;
    const method = req.method;

    if (url === '/') {
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
    if (url === '/message' && method === 'POST') {

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
}
//Way 1
//module.exports = requestHandler;

//Way2
// module.exports = {
//     handler: requestHandler,
//     someText: 'Some Hard coded Value'
// };

//Way3
//module.exports.requestHandler;

//Way 4 (Shortcut by nodejs)
exports.handler = requestHandler;
exports.someText = 'Some hard coded text';

