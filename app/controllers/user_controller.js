import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import User from '../models/user_model';

dotenv.config({ silent: true });


export const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};

export const signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  if (!email || !password) {
    res.status(422).send('You must provide email and password');
  }
  User.find({ email })
  .then((result) => {
    if (result.length) {
      return res.status(409).json('That Email already exists in the system.');
    } else {
      const user = new User();
      user.email = email;
      user.password = password;
      user.username = username;

      return user.save()
      .then((r) => {
        res.send({ token: tokenForUser(r) });
      })
      .catch((error) => {
        return res.status(500).json({ error });
      });
    }
  })
  .catch((error) => {
    return res.status(500).json({ error });
  });
};


function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user._id, iat: timestamp }, process.env.AUTH_SECRET);
}
