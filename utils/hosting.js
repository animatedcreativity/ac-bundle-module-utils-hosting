exports = module.exports = exports = module.exports = function() {
  var mod = {
    contentTypes: {
      "png": "image/png",
      "jpg": "image/jpg",
      "jpeg": "image/jpeg",
      "gif": "image/gif",
      "pdf": "application/pdf",
      "txt": "text/plain",
      "js": "text/js",
      "css": "text/css",
      "json": "application/json",
      "svg": "image/svg+xml"
    },
    static: function(request, response) {
      if (app.has(app.hosting)) {
        var fs = require('fs');
        var path = require('path');
        var http = require('http');
        var resolvedBase = path.resolve(__dirname + "/hosting/");
        var url = new URL(request.url);
        if (url.pathname.split("/").pop().trim() === "") url.pathname += "index.html";
        var safeSuffix = path.normalize(url.pathname).replace(/^(\.\.[\/\\])+/, '');
        var fileLoc = "." + path.join(resolvedBase, safeSuffix);
        fs.readFile(fileLoc, function(err, data) {
          if (err) {
            response.writeHead(404, 'Not Found');
            response.write('Not Found!');
            return response.end();
          }
          var ext = fileLoc.split(".").pop().toLowerCase();
          if (app.has(mod.contentTypes[ext])) response.setHeader("Content-Type", mod.contentTypes[ext]);
          response.statusCode = 200;
          response.write(data);
          response.end();
        });
      } else {
        response.statusCode = 400;
        response.end("Not configured.");
      }
    }
  };
  return mod;
};