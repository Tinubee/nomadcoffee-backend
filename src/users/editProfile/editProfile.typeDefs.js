import { gql } from "apollo-server";

export default gql`
  type Mutation {
    editProfile(
      username: String
      email: String
      password: String
      avatarURL: Upload
    ): MutationResponse!
  }
`;
