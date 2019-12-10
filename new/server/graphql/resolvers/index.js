const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');

const User=require('../../models/user');

module.exports = {
    createUser: async args => {
      try {
        const existingUser = await User.findOne({ email: args.userInput.email });
        const firstName = args.userInput.firstName
        const lastName = args.userInput.lastName
        const username = await User.findOne({ username: args.userInput.username });
        if(username){
          throw new Error('Username already taken')
        }
        if (existingUser) {
          throw new Error('User exists already.');
        }
        const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
        const user = new User({
            firstName: args.userInput.firstName,
            lastName: args.userInput.lastName,
            username: args.userInput.username,
            email: args.userInput.email,
            password: hashedPassword
          });
          const result = await user.save();

          return { ...result._doc, password: null, _id: result.id };
        } catch (err) {
          throw err;
        }
      },
      login: async ({ username, email, password }) => {
        const user = await User.findOne({ email: email });
        const userName = await User.findOne({ username: username })
        if(!userName){
          throw new Error('Username does not exist')
        }
        if (!user) {
          throw new Error('User does not exist!');
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
          throw new Error('Password is incorrect!');
        }
        const token = jwt.sign(
            { userId: user.id, email: user.email, username: user.username },
            'somesupersecretkey',
            {
              expiresIn: '1h'
            }
          );
          return { userId: user.id, token: token, tokenExpiration: 1 };
        }
      };