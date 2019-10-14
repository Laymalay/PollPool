import gql from 'graphql-tag';


export const getAllPollsQuery = gql`
  query AllPolls {
    id
    title
    description
    creator
    questions{
        id
        title
        choices{
            title
        }
    }
  }
`;
