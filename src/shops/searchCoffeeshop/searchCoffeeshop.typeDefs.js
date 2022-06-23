import { gql } from "apollo-server";

export default gql`
  type Query {
    searchCoffeeshop(keyword: String!): [CoffeeShop]
  }
`;
