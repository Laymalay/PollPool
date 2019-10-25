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
  mutation createPoll($title: String!, $description: String!, $imagePath: String!) {
    createPoll(title: $title, description: $description, imagePath: $imagePath) {
      title
      description
      imagePath
    }
  }
`;

export const  SignupMutation = gql`
  mutation SignupMutation($email: String!, $password: String!, $username: String!) {
    createUser(email: $email, password: $password, username: $username) {
      email
      username
    }
  }
`

export const  LoginMutation = gql`
  mutation LoginMutation($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`