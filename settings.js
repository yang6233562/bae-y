module.exports={
	cookieSecret:'myblog',
	db_name :'ltYUSpokgCkggpdyOtmT',                 // 数据库名，从云平台获取
	db_host :process.env.BAE_ENV_ADDR_MONGO_IP,     // 数据库地址
	db_port :process.env.BAE_ENV_ADDR_MONGO_PORT,  // 数据库端口
	username:process.env.BAE_ENV_AK,              // 用户名
	password:process.env.BAE_ENV_SK
};