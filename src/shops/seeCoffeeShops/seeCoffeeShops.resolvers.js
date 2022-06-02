import client from "../../client";

export default {
  Query: {
    seeCoffeeShops: async (_, { offset, userId }) =>
      client.coffeeShop.findMany({
        take: 10,
        skip: offset,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          photos: true,
          categories: true,
          user: true,
        },
      }),
  },
};
