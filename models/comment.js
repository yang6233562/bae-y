var mongodb = require('./db');
var username = process.env.BAE_ENV_AK;                
var password = process.env.BAE_ENV_SK;  

function Comment(name, day, title, comment) {
  this.name = name;
  this.day = day;
  this.title = title;
  this.comment = comment;
}

module.exports = Comment;

Comment.prototype.save = function(callback) {
  var name = this.name,
      day = this.day,
      title = this.title,
      comment = this.comment;
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
      db.authenticate(username, password, function(err, result) { 
              if (!result) {
                //res.end('Authenticate failed!');
                return;   
                }
        db.collection('posts', function (err, collection) {
          if (err) {
            mongodb.close();
            return callback(err);
          }
          //通过用户名、发表日期及标题查找文档，并把一条留言添加到该文档的 comments 数组里
          // console.log(name);
          collection.findAndModify({"name":name,"time.day":day,"title":title}
          , [ ['time',-1] ]
          , {$push:{"comments":comment}}
          , {new: true}
          , function (err,comment) {
            console.log(err);
              mongodb.close();
              callback(null);
          });   
        });
      });
  });
};