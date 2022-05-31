import client from "../../client";
import { processCategories } from "../shops.utils";
import { uploadToS3 } from "../../shared/shared.utils";
import { protectedResolvers } from "../../users/users.utils";

export default {
  Mutation: {
    editCoffeeShop: protectedResolvers(
      async (
        _,
        { id, name, caption, latitude, longitude, file },
        { loggedInUser }
      ) => {
        try {
          const oldData = await client.coffeeShop.findFirst({
            where: {
              id,
              userId: loggedInUser.id,
            },
            include: {
              categories: {
                select: {
                  category: true,
                },
              },
            },
          });

          //console.log(oldData);

          let fileUrl = null;
          let categoriesObjs = [];
          if (caption) {
            categoriesObjs = processCategories(caption);
          }

          if (file) {
            fileUrl = await uploadToS3(file, loggedInUser.id, "uploads");
          }

          await client.coffeeShop.update({
            where: {
              id,
            },
            data: {
              name: name !== "undefined" ? name : oldData.name,
              caption: caption !== "undefined" ? caption : oldData.caption,
              ...(categoriesObjs.length > 0 && {
                categories: {
                  disconnect: oldData.categories,
                  connectOrCreate: categoriesObjs,
                },
              }),
              ...(fileUrl !== null && {
                photos: {
                  update: {
                    url: fileUrl,
                  },
                },
              }),
            },
          });
          return {
            ok: true,
          };
        } catch (e) {
          return {
            ok: false,
            error: e.message,
          };
        }
      }
    ),
  },
};
