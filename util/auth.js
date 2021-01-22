const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');
const { KEY } = require('../config');

module.exports = (context) => {
  const header = context.req.headers.authorization;

  if (header) {
    const token = header.split('Bearer ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError('Invalid/Expired token');
      }
    } else {
      throw new AuthenticationError('Invalid authorization header');
    }
  } else {
    throw new AuthenticationError('Authorization header must be provided');
  }
};
