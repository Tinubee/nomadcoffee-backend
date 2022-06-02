import client from "../../client";
import bcrypt from "bcrypt";
import { protectedResolvers } from "../users.utils";
import { uploadToS3 } from "../../shared/shared.utils";

const resolverFuction = async (
  _,
  { username, email, password: newPassword, avatarURL },
  { loggedInUser }
) => {
  let avatarUrl = null;
  if (avatarURL) {
    avatarUrl = await uploadToS3(avatarURL, loggedInUser.id, "avatars");
  }

  let _hashPassword = null;
  if (newPassword) {
    _hashPassword = await bcrypt.hash(newPassword, 10);
  }
  const updatedUser = await client.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      username,
      email,
      ...(_hashPassword && { password: _hashPassword }),
      ...(avatarUrl && { avatarURL: avatarUrl }),
    },
  });
  if (updatedUser.id) {
    return {
      ok: true,
    };
  } else {
    return { ok: false, error: "Can't update profile" };
  }
};

export default {
  Mutation: {
    editProfile: protectedResolvers(resolverFuction),
  },
};
