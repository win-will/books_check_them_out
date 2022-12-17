import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me($username: username) {
    me(username: $username) {
      username
    }
  }
`;
