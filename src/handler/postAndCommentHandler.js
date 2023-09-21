const https = require('https');
const postHandler = require('./postHandler');
const commentHandler = require('./commentHandler');

const postAndCommentHandler = {};

postAndCommentHandler.getAllPostAndComments = (req, res) => {
  let postData = '';
  let commentData = '';

  https.get('https://jsonplaceholder.typicode.com/posts', (postResponse) => {
    postResponse.on('data', (chunk) => {
      postData += chunk;
    });

    postResponse.on('end', () => {
      https.get('https://jsonplaceholder.typicode.com/comments', (commentResponse) => {
        commentResponse.on('data', (chunk) => {
          commentData += chunk;
        });

        commentResponse.on('end', () => {
          const posts = JSON.parse(postData);
          const comments = JSON.parse(commentData);

          const combinedData = posts.map((post) => {
            const postComments = comments.filter((comment) => comment.postId === post.id);
            return {
              post,
              comments: postComments,
            };
          });

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(combinedData));
        });
      });
    });
  });
};

module.exports = postAndCommentHandler;