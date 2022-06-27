import client from "../client";

export default {
  Category: {
    totalShops: ({ id }) =>
      client.coffeeShop.count({
        where: {
          categories: {
            some: {
              id,
            },
          },
        },
      }),
  },
  CoffeeShop: {
    isMine: (userId, _, { loggedInUser }) => {
      if (!loggedInUser) {
        console.log("not logged in");
        return false;
      }
      //console.log(loggedInUser.id);
      //console.log(userId?.userId);
      return userId?.userId === loggedInUser.id;
    },
  },
};
