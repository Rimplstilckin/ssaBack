const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
        "humidity": 55, 
        "temperature":  22.8,
        "polution": 3410,
        "light": false,
        "warning": false
    }));
});

server.listen(3002);