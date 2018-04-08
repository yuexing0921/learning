function third(req, res, next) {
	console.log('This is third-party middleware', Date.now());
	// 请求下一个中间件
	next();
}

module.exports = third;
