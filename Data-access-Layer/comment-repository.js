var db = require('./db.js');

exports.getComments = function (callback) {
    db.getComments(callback);
}
exports.getComment =  function (commentId, callback) {
    db.getComment(commentId, callback);
}
exports.deleteComment = function (commentId, callback) {
    db.deleteComment(commentId, callback);
}