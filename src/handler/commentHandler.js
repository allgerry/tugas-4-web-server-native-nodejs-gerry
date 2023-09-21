const https = require('https');

const commentHandler = {};

commentHandler.getAllComments = (req, res) => {
  https.get('https://jsonplaceholder.typicode.com/comments', (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    });
  });
};

module.exports = commentHandler;