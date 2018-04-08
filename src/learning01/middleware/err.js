/**
 * 错误级别的middleware
 */
module.exports = function (app) {
	app.use((err, req, res, next) => {
		console.error('Something broke!');
		res.status(500).send(err.stack);
	});
};
