const http = require("http");
const server = http.createServer((req, res) => {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("Hello WOrld\n");
});
server.listen(8008);