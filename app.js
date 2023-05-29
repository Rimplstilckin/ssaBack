const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
        "humidity": 45, 
        "temperature":  21,
        "polution": 1230,
        "light": false,
        "warning": false
    }));
});

server.listen(3002);