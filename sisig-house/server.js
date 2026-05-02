const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 8000;
const DIR = __dirname;

const server = http.createServer((req, res) => {
    let urlPath = url.parse(req.url).pathname;
    if (urlPath === '/' || urlPath === '') {
        urlPath = '/index.html';
    }
    
    let filePath = path.join(DIR, urlPath);
    
    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 - File Not Found</h1>', 'utf-8');
            return;
        }
        
        const ext = path.extname(filePath);
        let contentType = 'text/html';
        
        switch (ext) {
            case '.css': contentType = 'text/css'; break;
            case '.js': contentType = 'text/javascript'; break;
            case '.json': contentType = 'application/json'; break;
            case '.png': contentType = 'image/png'; break;
            case '.jpg': contentType = 'image/jpeg'; break;
            case '.gif': contentType = 'image/gif'; break;
        }
        
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Sorry, check with the site admin for error: ' + err.code + ' ..\n');
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    });
});

server.listen(PORT, () => {
    console.log(`🔥 SISIG HOUSE Website is running! 🔥`);
    console.log(`\n✨ Open your browser and visit: http://localhost:${PORT}\n`);
    console.log(`Press Ctrl+C to stop the server.\n`);
});
