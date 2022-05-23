require("dotenv").config();

import { ApolloServer } from "apollo-server";
import { typeDefs, resolvers } from "./schema";

const PORT = process.env.PORT;

const server = new ApolloServer({ typeDefs, resolvers });

server
  .listen()
  .then(() => console.log(`🚀 Server is running on http://localhost:${PORT}`));
