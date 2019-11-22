import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
    user: UserType 
  }
`;

export const resolvers = {};