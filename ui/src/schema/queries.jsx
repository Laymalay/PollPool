import gql from "graphql-tag";

export const getAllPollsQuery = gql`
  query allPolls($creator: Int) {
    allPolls(creator: $creator) {
      id
      title
      imagePath
      description
      creator {
        id
        username
      }
      questions {
        id
        title
        choices {
          title
        }
      }
    }
  }
`;

export const meQuery = gql`
  {
    me {
      id
      username
    }
  }
`;
