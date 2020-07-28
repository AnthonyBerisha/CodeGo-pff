const serverSecret = process.env.SERVER_JWT_SECRET;

var jwt = require('jsonwebtoken');


function access(req, res, next) {
	try {
		const authorization = req.headers.authorization.split(' ');
		const accessToken = authorization[authorization.length - 1];
		const token = jwt.verify(accessToken, serverSecret);
		req.tokenData = token;
		console.log(req.tokenData);
		next();
	} catch(err) {
		if (err.message === 'jwt must be provided') {
			console.log('no jwt');
			res.status(403).json({ error: 'NoAccessToken' })
		} else if (err.message === 'invalid signature') {
			console.log('invalid signature');
			res.status(403).json({ error: 'InvalidSignature' });
		} else if (err.message === 'jwt expired') {
			console.log('jwt expired');
			res.status(403).json({ error: 'AccessTokenExpired' })
		}
	}
}

module.exports = access;