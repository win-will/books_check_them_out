const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args) => {
      // const params = username ? { username } : {};
      const user = await User.findOne({username: args.username});

      return user;
    }
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
      loginUser: async (parent, { email, password }) => {
        const user = await User.findOne({ email });

        if (!user) {
          throw new AuthenticationError('No user found with this email address');
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }

        const token = signToken(user);

        return { token, user };
      },
      // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
    // user comes from `req.user` created in the auth middleware function
    saveBook: async (parent, args) => {
      // console.log(input);
      // console.log(args);

      const updatedUser = await User.findOneAndUpdate(

        { username: args.username },
        { $addToSet: { savedBooks: args.input } },
        { new: true, runValidators: true }
      );
      
      // console.log(updatedUser);
      // console.log("Updated User: Saved Book!");
      
      return updatedUser;

    },
    // remove a book from `savedBooks`
    removeBook: async (parent, { _id, bookId }) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: _id },
        { $pull: { savedBooks: { bookId: bookId } } },
        { new: true }
      );
      return updatedUser;
    },
  }
};

module.exports = resolvers;
