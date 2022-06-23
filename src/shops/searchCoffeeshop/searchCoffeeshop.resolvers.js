import { client } from "../../client";

export default {
  Query: {
    searchCoffeeshop: (_, { keyword }) =>
      client.coffeeShop.findMany({
        where: {
          OR: [
            {
              name: {
                contains: keyword,
              },
            },
            {
              categories: {
                some: {
                  category: {
                    contains: keyword,
                  },
                },
              },
            },
          ],
        },
      }),
  },
};
