import gql from "graphql-tag";

export const getAllPollsQuery = gql`
  {
    allPolls {
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
