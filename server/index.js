// const { log } = require('console');
const http = require('http');
const PORT = 5173;

const server = http.createServer((req , res) => {
    console.log(req.url);
    if(req.url == '/'){
        res.statusCode = 200;
        res.setHeader('Content-Type' , 'text/plain');
        res.end("welcome to home page");
    }
    else{
        res.statusCode = 404;
        res.setHeader('Content-Type' , 'text/plain');
        res.end("page not found");
    }
})

server.listen(PORT , () => {
    console.log(`${PORT}`);
})
