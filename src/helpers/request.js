/*
This method was created by Gevorg A. Galstyan.
I stole it from https://medium.com/@gevorggalstyan/how-to-promisify-node-js-http-https-requests-76a5a58ed90c
Thank you <3

(async () => {
  try {
    const data = await request(
      'https://the-showman-and-the-g-clef-u8pmjbhb7ixy.runkit.sh'
    );
    console.log(data);
  } catch (error) {
    console.error(error);
  }
})();

*/
const http = require('http');
const https = require('https');

let req = function (url, method = 'GET', postData) {
  console.log(url);

  const parsedUrl = new URL(url);

  const params = {
    method,
    host: parsedUrl.hostname,
    port: parsedUrl.port,
    path: parsedUrl.pathname
  };
  const lib = parsedUrl.protocol === 'https:' ? https : http;

  return new Promise((resolve, reject) => {
    const req = lib.request(params, res => {
      if (res.statusCode < 200 || res.statusCode >= 300) {
        return reject(new Error(`Status Code: ${res.statusCode}`));
      }

      const data = [];

      res.on('data', chunk => {
        data.push(chunk);
      });

      res.on('end', () => {
        console.log(Buffer.concat(data).toString());
        resolve(Buffer.concat(data).toString());
      });

      req.on('error', reject(err));

      if (postData) {
        req.write(postData);
      }

      // IMPORTANT
      req.end();
    });
  });
};
module.exports = req;
