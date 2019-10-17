import gql from "graphql-tag";

export const getAllPollsQuery = gql`
  {
    allPolls {
      id
      title
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
