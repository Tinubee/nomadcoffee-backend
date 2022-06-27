import client from "../../client";
import { processCategories } from "../shops.utils";
import { uploadToS3 } from "../../shared/shared.utils";
import { protectedResolvers } from "../../users/users.utils";

export default {
  Mutation: {
    createCoffeeShop: protectedResolvers(
      async (
        _,
        { name, caption, latitude, longitude, file },
        { loggedInUser }
      ) => {
        // category 추출하기
        let categoriesObjs = [];
        if (caption) {
          categoriesObjs = processCategories(caption);
        }

        let fileUrl = null;
        //console.log(file);
        if (file) {
          fileUrl = await uploadToS3(file, loggedInUser.id, "uploads");
        }
        return client.coffeeShop.create({
          data: {
            name,
            caption,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            latitude,
            longitude,
            ...(categoriesObjs.length > 0 && {
              categories: {
                connectOrCreate: categoriesObjs,
              },
            }),
            photos: {
              create: {
                url: fileUrl,
              },
            },
          },
        });
      }
    ),
  },
};
