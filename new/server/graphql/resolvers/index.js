const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');

const User=require('../../models/user');

module.exports = {
    createUser: async (args, request )=> {
      try {
        const existingUserEmail = await User.findOne({ email: args.userInput.email });
        if (existingUserEmail) {
          throw new Error('User exists already.');
        }
        const existingUserName=await User.findOne({ username:args.userInput.username })
        if(existingUserName){
          throw new Error("Username already exists");
        }
        console.log(args);
        const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
        const user = new User({
            fname:args.userInput.fname,
            lname:args.userInput.lname,
            username:args.userInput.username,
            email: args.userInput.email,
            password: hashedPassword,
            birthDate:args.userInput.birthDate,
            image:args.userInput.image,
          });
          const result = await user.save();

          return { ...result._doc, password: null, _id: result.id };
        } catch (err) {
          throw err;
        }
      },
      login: async ({ email, password }) => {
        console.log(email, password);
        const user = await User.findOne({ email: email });
        if (!user) {
          throw new Error('User does not exist!');
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
          throw new Error('Password is incorrect!');
        }
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            'somesupersecretkey',
            {
              expiresIn: '1h'
            }
          );
          return { userId: user.id, token: token, tokenExpiration: 1 };
        },
        getUserDetails:async (args, request)=>{
          const { userId }=request;
          return User.findById(userId)
          .then((users)=>{
            return users;
          }).catch((err)=>{
            console.log(err);
          })
        },
        updateInfo: async (args, request)=>{
          // console.log(args);
          const { userId }=request;
          const { fname, lname, username, email, description, image }=args.UpdateInput;
          return User.findByIdAndUpdate(userId,{ fname, lname, username, email, description, image })
          .then((res)=>{
            return "updated";
          })
          .catch((err)=>{
            console.log(err);
          })
        },
        getRandomUserDetails: async (args, request)=>{
          const { userId }=request;
          const requestedUserName=args.RandomUserInput.username;
          return User.findOne({ username:requestedUserName })
          .then((res)=>{
            // console.log(res);
            return res;
          }).catch((err)=>{
            console.log(err);
          })
        }
      };