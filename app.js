const http = require('http');

const server = http.createServer((req, res)=>{
    // console.log(req.url, req.method, req.headers);
    // res.setHeader('Content-Type', 'text/hmtl');
    res.write('Test');
    res.end();
});

server.listen(80);