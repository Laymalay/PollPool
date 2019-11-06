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
  mutation createPoll(
    $title: String!
    $description: String!
    $imagePath: String!
  ) {
    createPoll(
      title: $title
      description: $description
      imagePath: $imagePath
    ) {
      title
      description
      imagePath
      id
      creator{
        username
      }
    }
  }
`;
export const createQuestionMutation = gql`
  mutation createQuestion($title: String!, $pollId: Int!, $answer: String!) {
    createQuestion(title: $title, pollId: $pollId, answer: $answer) {
      id
    }
  }
`;
export const createChoiceMutation = gql`
  mutation createChoice($title: String!, $questionId: Int!) {
    createChoice(title: $title, questionId: $questionId) {
      title
    }
  }
`;
export const SignupMutation = gql`
  mutation SignupMutation(
    $email: String!
    $password: String!
    $username: String!
  ) {
    createUser(email: $email, password: $password, username: $username) {
      email
      username
    }
  }
`;

export const LoginMutation = gql`
  mutation LoginMutation($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;

export const CreatePassedPollMutation = gql`
  mutation createPassedPoll(
    $pollId: Int!
    $answeredQuestions: [AnsweredQuestionInputType]
  ) {
    createPassedPoll(pollId: $pollId, answeredQuestions: $answeredQuestions) {
      id
      poll {
        id
        title
      }
      user {
        username
      }
      score
    }
  }
`;
