const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){

  const token = req.headers.authorization.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decodedToken
    next();
  } catch (e) {
    console.log('auth error : ', e);
    return res.status(401).json({ message : "Auth Failed - no token found - authorization denied"})
  }
}
