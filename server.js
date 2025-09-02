const http = require('http'); //http es provisto por node.js

const server = http.createServer((req, res => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
}))

const PORT = 3000;
server.listen(PORT, () => {
    console.log('Server corriendo en puerto ${PORT}');
})