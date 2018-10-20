import express from 'express';
import Debug from 'debug';
import jwt from 'jsonwebtoken';
import { secret } from '../config/index';
import { User } from '../models';
import  { hashSync as hash, compareSync as comparePasswords } from 'bcryptjs';

const debug = new Debug('platzi-overflow:auth-middleware');
const app =  express.Router();

app.post('/signin', async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email })

  if (!user) {
    debug(`User with email ${email} not found`);
    return handleLoginFailed(res);
  }

  if(!comparePasswords(password, user.password)) {
    debug(`Passwords don\'t match: ${password} !== ${user.password}`);
    return handleLoginFailed(res, 'El correo y la contraseña no coinciden');
  }

  const token = createToken(user);

  res.status(200).json({
    message: 'Login succeded',
    token,
    userId: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  })
});

app.post('/signup', async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  const u = new User({
    firstName,
    lastName,
    email,
    password: hash(password, 10)
  });
  debug(`Creating new user: ${u}`)
  const user = await u.save();
  const token = createToken(user);
  res.status(201).json({
    message: 'User saved',
    token,
    userId: user._id,
    firstName,
    lastName,
    email
  })
})

const createToken = user => jwt.sign({ user }, secret, { expiresIn: 86400 })

function handleLoginFailed(res, message) {
  return res.status(401).json({
    message: 'Login failed',
    error: message || 'Email and password don\'t match',
  })
}

export default app;
