import Debug from 'debug';
import { secret } from '../config/index';
import jwt from 'jsonwebtoken';

export const debug = new Debug('platzi-overflow:auth-middleware');

export const required = (req, res, next) => {
  jwt.verify(req.query.token, secret, (err, token) => {
    if(err) {
      debug('JWT was not encrypted with our secret string');
      return res.status(401).json({
        message: 'Unauthourized',
        error: err,
       })
    }

    debug(`Token verified ${token}`);
    req.user = token.user;
    next();
  });
}
