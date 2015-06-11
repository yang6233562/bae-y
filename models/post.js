var mongodb = require('./db'),
markdown = require('markdown').markdown;
var username = process.env.BAE_ENV_AK;                
var password = process.env.BAE_ENV_SK;  

function Post(name, head, title, tags, post) {
  this.name = name;
  this.head = head;
  this.title = title;
  this.tags = tags;
  this.post = post;
}

module.exports = Post;

Post.prototype.save = function(callback) {//存储一篇文章及其相关信息
  var date = new Date();
  //存储各种时间格式，方便以后扩展
  var time = {
      date: date,
      year : date.getFullYear(),
      month : date.getFullYear() + "-" + (date.getMonth()+1),
      day : date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate(),
      minute : date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes()
  }
  //要存入数据库的文档
var post = {
    name: this.name,
    head: this.head,
    time: time,
    title:this.title.replace(/\s+$/,''),
    tags: this.tags,
    post: this.post,
    comments: [],
    pv: 0
};
  //打开数据库
  mongodb.open(function (err, db) {
     db.authenticate(username, password, function(err, result) { 
          if (!result) {
            //res.end('Authenticate failed!');
            return;   
            }
      //读取 posts 集合
      db.collection('posts', function (err, collection) {
        if (err) {
          mongodb.close();
          return callback(err);
        }
        //将文档插入 posts 集合
        collection.insert(post, {
          safe: true
        }, function (err,post) {
          mongodb.close();
          callback(null);
        });
      });
    })
  });
};


Post.prototype.update = function(callback) {//更新一篇文章
  var name = this.name;
  var title = this.title;
  var post = this.post;
      mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
     db.authenticate(username, password, function(err, result) { 
              if (!result) {
                //res.end('Authenticate failed!');
                return;   
                }
    //读取 posts 集合
    db.collection('posts', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      collection.findAndModify({"name":name,"title":title}
      ,[]
      , {$set:{"post":post}}
      , {}
      , function (err,post) {
        // console.log(err);
         console.log(post);
          mongodb.close();
          callback(null);
      })
});
});
});
};

Post.getTen = function(name, page, callback) {//一次获取十篇文章
  //打开数据库
  mongodb.open(function (err, db) {
     db.authenticate(username, password, function(err, result) { 
          if (!result) {
            //res.end('Authenticate failed!');
            return;   
          }

              db.collection('pvs', function(err, collection) {
            if (err) {
              mongodb.close();
              return callback(err);
            }
            collection.update({'name':'pvpv'},{$inc:{"pv":1}});
          });

            db.collection('posts', function(err, collection) {
            if (err) {
              mongodb.close();
              return callback(err);
            }
            var query = {};
            if (name) {
              query.name = name;
            }
            //根据 query 对象查询，并跳过前 (page-1)*10 个结果，返回之后的10个结果
            collection.find(query,{skip:(page-1)*40,limit:40}).sort({
              time: -1
            }).toArray(function (err, docs) {
              mongodb.close();
              if (err) {
                callback(err, null);//失败！返回 null
              }
              //解析 markdown 为 html
              docs.forEach(function(doc){
                doc.post = markdown.toHTML(doc.post);
              });
              callback(null, docs);//成功！以数组形式返回查询的结果
            });
          });
        });  

    if (err) {
      return callback(err);
    }
    //读取 posts 集合
  
  });
};

Post.getArchive = function(callback) {//返回所有文章
  mongodb.open(function (err, db) {
     db.authenticate(username, password, function(err, result) { 
        if (err) {
          return callback(err);
        }
        db.collection('posts', function(err, collection) {
          if (err) {
            mongodb.close();
            return callback(err);
          }
          //返回只包含 name、time、title 的文档组成的数组
          collection.find({},{"name":1,"time":1,"title":1}).sort({
            time:-1
          }).toArray(function(err, docs){
            mongodb.close();
            if (err) {
              callback(err, null);
            }
            callback(null, docs);
          });
        });
      })
  });
};

Post.getTags = function(callback) {//返回所有标签
  mongodb.open(function (err, db) {
     db.authenticate(username, password, function(err, result) { 
            if (!result) {
              //res.end('Authenticate failed!');
              return;   
            }
      db.collection('posts', function(err, collection) {
        if (err) {
          mongodb.close();
          return callback(err);
        }
        //distinct 用来找出给定键的所有不同值
        collection.distinct("tags.tag",function(err, docs){
          mongodb.close();
          if (err) {
            callback(err, null);
          }
          callback(null, docs);
        });
      });
    });
  });
};

Post.getTag = function(tag, callback) {//返回含有特定标签的所有文章
  mongodb.open(function (err, db) {
      db.authenticate(username, password, function(err, result) { 
            if (!result) {
              //res.end('Authenticate failed!');
              return;   
            }
      db.collection('posts', function(err, collection) {
        if (err) {
          mongodb.close();
          return callback(err);
        }
        //通过 tags.tag 查询并返回只含有 name、time、title 键的文档组成的数组
        collection.find({"tags.tag":tag},{"name":1,"time":1,"title":1}).sort({
          time:-1
        }).toArray(function(err, docs){
          mongodb.close();
          if (err) {
            callback(err, null);
          }
          callback(null, docs);
        });
      });
    });
  });
};

Post.search = function(keyword, callback) {//返回通过标题关键字查询的所有文章
  mongodb.open(function (err, db) {
     db.authenticate(username, password, function(err, result) { 
          if (!result) {
            //res.end('Authenticate failed!');
            return;   
              }
        db.collection('posts', function(err, collection) {
          if (err) {
            mongodb.close();
            return callback(err);
          }
          var pattern = new RegExp("^.*"+keyword+".*$", "i");
          collection.find({"title":pattern},{"name":1,"time":1,"title":1}).sort({
            time:-1
          }).toArray(function(err, docs){
            mongodb.close();
             if (err) {
             callback(err, null);
            }
            callback(null, docs);
          });
        });
      });
  });
};

Post.getOne = function(name, day, title,action, callback) {//获取一篇文章
  //打开数据库
  mongodb.open(function (err, db) {
     db.authenticate(username, password, function(err, result) { 
          if (!result) {
            //res.end('Authenticate failed!');
            return;   
          }
    //读取 posts 集合
      db.collection('posts', function(err, collection) {
        if (err) {
          mongodb.close();
          return callback(err);
        }
        //根据用户名、发表日期及文章名进行精确查询
        collection.findOne({"name":name,"time.day":day,"title":title},function (err, doc) {
          mongodb.close();
          if (err) {
            callback(err, null);
          }
          //解析 markdown 为 html
          if(doc){
              if(!action){
              doc.post = markdown.toHTML(doc.post);
          		 }
              doc.comments.forEach(function(comment){
                comment.content = markdown.toHTML(comment.content);
              });
            }
          callback(null, doc);//返回特定查询的文章
        });
        if(!action){
        collection.update({"name":name,"time.day":day,"title":title},{$inc:{"pv":1}});
        }
      });
    });
  });
};