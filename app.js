var express = require('express')
var app = express();
var DB = require('./models/db');
var routes = require('./routes');
var path = require('path');
var flash = require('connect-flash');
var settings = require('./settings');
var MemcacheStore = require('connect-memcache')(express);


var username = process.env.BAE_ENV_AK;                // 用户名
var password = process.env.BAE_ENV_SK;     

app.configure(function(){
    app.set('port', process.env.PORT);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(flash());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    // app.use(express.session({
    //       secret: settings.cookieSecret,
    //       // key: settings.db_name,
    //       // cookie: {maxAge: 1000 * 60 * 60 * 24 * 30},//30 days
    //       store: new MongoStore({
    //         db:settings.db_name,
    //         host:settings.db_host,
    //         port:settings.db_port
    //       })
    //     }));
    app.use(express.session({
        secret: 'yblogcloud',
        store: new MemcacheStore
    }));
    app.use(app.router);
    if ('development' == app.get('env')) {
      app.use(express.errorHandler());
    }
    app.use(require('stylus').middleware(__dirname + '/public'));
    app.use(express.static(path.join(__dirname, 'public')));
});
 
routes(app);

app.listen(process.env.APP_PORT);