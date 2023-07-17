const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if(url === '/'){
        res.write('<html>');
        res.write('<head><title>Enter message</title></head>');
        res.write("<body><form action='/message' method='POST'><input type='text' name='message' /><button type='submit'>Submit</button></form></body>");
        res.write('</html>');
        return res.end();
    }   
    if(url==='/message' && method==='POST'){
        const body = [];
        req.on('data', (chunk)=>{
            console.log(chunk);
            body.push(chunk);
        });
        req.on('end', () => {
            const parsebody = Buffer.concat(body).toString();
            const message = parsebody.split('=')[1];
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<ead><title>Stranica</title></head>');
    res.write('<body><h1>Hello</h1></body>');
    res.write('</html>');
    res.end(); 
}

module.exports = requestHandler;

// Ostali nacini

// Exportujes vise stvari

// exports = {
//     hanler: requestHandler,
//     nekiText: 'Neki tekst ili funkcija'
// }

// exports.hanler = requestHandler;
// exports.nekiText = 'Neki tekst ili funkcija';