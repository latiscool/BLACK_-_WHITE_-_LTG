const open = require('open');
const Jimp = require('jimp');
const http = require('http');
const url = require('url');
const fs = require('fs');
const PORT = 8080;
const host = 'localhost';

console.log('BIENVENIDO BLACK & WHITE SPA SERVER');

open(`http://${host}:${PORT}/`, function (err) {
  if (err) throw err;
});

const requestListener = (req, res) => {
  const params = url.parse(req.url, true).query;
  const uploadFile = params.upload_file;
  //Para mostrar el formulario
  if (req.url == '/') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    fs.readFile('index.html', 'utf8', (err, html) => {
      if (err) {
        return console.log('Ha ocurrido una falla: ' + err);
      }
      res.end(html);
    });
  }
  //Para mostrar la conversion de la imagen
  if (req.url.includes('/conversion')) {
    Jimp.read(uploadFile, (err, imagen) => {
      if (err) {
        return console.log('Ha ocurrido una falla: ' + err);
      }
      imagen
        .resize(350, Jimp.AUTO)
        .greyscale()
        .quality(60)
        .writeAsync('newImg.png')
        .then(() => {
          fs.readFile('newImg.png', (err, Imagen) => {
            if (err) {
              return console.log('Ha ocurrido una falla: ' + err);
            }
            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
            res.end(Imagen);
          });
        });
    });
  }
  //Para mostrar el css
  if (req.url == '/estilos') {
    res.writeHead(200, { 'Content-Type': 'text/css' });
    fs.readFile('style.css', (err, css) => {
      if (err) {
        return console.log('Ha ocurrido una falla: ' + err);
      }
      res.end(css);
    });
  }
};
//Armando el server
const server = http.createServer(requestListener);
//Server escuchando en .....
server.listen(PORT, host, () => {
  console.log(`El servidor se esta ejecutando en http://${host}:${PORT}`);
});
