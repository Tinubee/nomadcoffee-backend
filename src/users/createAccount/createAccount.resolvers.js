import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    createAccount: async (_, { username, email, password }) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });
        if (existingUser) {
          throw new Error("Username or email already exists");
        }
        const hashPassword = await bcrypt.hash(password, 10);
        await client.user.create({
          data: {
            username,
            email,
            password: hashPassword,
          },
        });
        return {
          ok: true,
        };
      } catch (err) {
        return {
          ok: false,
          error: "Can't create account",
        };
      }
    },
  },
};
