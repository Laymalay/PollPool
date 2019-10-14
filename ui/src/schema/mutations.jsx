import gql from "graphql-tag";

export const updatePollMutation = gql`
  mutation updatePoll($title: String!, $id: Int!) {
    updatePoll(id: $id, logo: $title) {
      id
      title
    }
  }
`;


export const createPollMutation = gql`
  mutation createPoll($title: String!, $description: String!) {
    createPoll(title: $title, description: $description) {
      title
      description
    }
  }
`;
