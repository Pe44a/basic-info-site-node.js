const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer(function (req, res) {
  let q = url.parse(req.url, true);
  let pathname = (q.pathname + '.html');
  let filename = pathname.slice(1);


  if (filename === '.html') {
    fs.readFile('index.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
      });

  }else {
    fs.readFile(filename, function(err, data) {
        //Shows 404.html page if none-existing url address is searched
        if (err) {
          fs.readFile('404.html', function(data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
          });
        }
    
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
      });
  }
  

}).listen(8080);