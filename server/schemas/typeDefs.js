const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]

  }

  type Book {
    bookId: ID!
    authors: [String]
    description: String!
    title: String!
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User!
  }

  input BookInput {
    bookId: ID
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type Query {
    me(username: String!): User
  }

  type Mutation {
    loginUser(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(username: String!, input: BookInput!): User
    removeBook(_id: ID!, bookId: ID!): User
    
  }
`;

module.exports = typeDefs;
