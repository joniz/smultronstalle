var db = require('./db.js');

exports.getPosts = function (callback) {
    db.getPosts(callback);
}
exports.getPostsComments = function (postId, callback) {
    db.getPostsComments(postId, callback);
}
exports.addPost = function (userId, post, callback) {
    db.addPost(userId, post, callback);
}
exports.addImageToPost = function (postId, imageLink, callback) {
    db.addImageToPost(postId, imageLink, callback);
}
