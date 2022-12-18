import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me($username: String!) {
    me(username: $username) {
  
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    
    }
  }
`;
