const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const {
  validateRegisterInput,
  validateLoginInput,
} = require('../../util/validators');
const { KEY } = require('../../config');
const User = require('../../models/User');

function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, username: user.username },
    KEY,
    { expiresIn: '1h' }
  );
}

module.exports = {
  Mutation: {
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      const validatorResult = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );

      if (!validatorResult.valid) {
        throw new UserInputError('Errors in input', {
          errors: validatorResult.errors,
        });
      }

      const user = await User.findOne({ username });

      if (user) {
        throw new UserInputError('Username is taken', {
          errors: {
            username: 'This username is taken',
          },
        });
      }

      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
    async login(_, { username, password }) {
      const user = await User.findOne({ username });

      const validationResult = validateLoginInput(username, password);

      if (!validationResult.valid) {
        throw new UserInputError('Errors', { errors: validationResult.errors });
      }

      if (!user) {
        throw new UserInputError('User not found', {
          errors: { username: 'Username does not exist' },
        });
      }

      if (!(await bcrypt.compare(password, user.password))) {
        throw new UserInputError('Incorrect password', {
          errors: { password: 'Incorrect password' },
        });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
  },
};
