var db = require('./db.js');

exports.getPosts = function (callback) {
    db.getPosts(callback);
}
exports.getPostsComments = function (postId, callback) {
    db.getPostsComments(postId, callback);
}