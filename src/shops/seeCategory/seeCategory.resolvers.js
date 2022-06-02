import client from "../../client";
import { categoryCheck } from "../../constants";

export default {
  Query: {
    seeCategory: (_, { category }) =>
      client.coffeeShop.findMany({
        where: {
          categories: {
            some: {
              category,
            },
          },
        },
        include: {
          categories: true,
          user: true,
        },
      }),
  },
};
