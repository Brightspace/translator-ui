'use strict';

var fs = require('fs'),
    http = require('http'),
    path = require('path'),
    url = require('url');

console.log( process.env.PORT );

http.createServer(function (request, response) {
    var fsPath = path.join(__dirname, 'src',  url.parse(request.url).pathname);

    fs.stat(fsPath, function(err, stat) {
        if( err ) {
            response.writeHead(500, err.toString());
            response.end();
        } else {
            if( stat.isDirectory() ) {
                fsPath = path.join(fsPath, 'index.html');
            }

            response.writeHead(200);

            fs.readFile( fsPath, function( err, data ) {
                response.write(data);
                response.end();
            });
        }
    });
}).listen({
    port: parseInt(process.env.PORT)
}, function() {
    console.log("listening on port " + process.env.PORT);
});