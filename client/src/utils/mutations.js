import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      email
      password
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      username
      email
      password
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($user: User!, $input: BookInput!) {
    addUser(user: $user, input: $BookInput) {
      user
      BookInput
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($_id: ID!, $bookId: ID!) {
    removeBook(_id: $_id, bookId: $bookId) {
      _id
      bookId
    }
  }
`;
