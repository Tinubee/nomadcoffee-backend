import { gql } from "apollo-server";

export default gql`
  type LoginResult {
    ok: Boolean!
    token: String
    error: String
    username: String
  }

  type Mutation {
    login(username: String!, password: String!): LoginResult!
  }
`;
