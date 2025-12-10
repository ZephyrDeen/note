import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


function authToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next();
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized', code: 401 });
      }

      req.body = req.body || {};
      req.body.username = decoded.username;
      req.body.password = decoded.password;

      req.user = {
        id: decoded.id,
        username: decoded.username
      };

      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error', code: 500 });
  }
}

export { authToken };