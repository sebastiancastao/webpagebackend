// src/module/auth/oauth.service.ts

import { ENV_JWT } from "../config/envs";
import jwt, { SignOptions } from "jsonwebtoken";
import UserModel from "./models/user.model";
import { toSlug } from "../utils/slugify";

export class OAuthMongoDBService {
  async handleOAuth(profileGoogle: any): Promise<{ accessToken: string; refreshToken: string }> {
    const email = profileGoogle.emails?.[0]?.value || "";
    const username = toSlug(profileGoogle.name.givenName);

    let user = await UserModel.findOne({ email });

    if (!user) {
      user = new UserModel({
        googleId: profileGoogle.id,
        username,
        name: profileGoogle.name.givenName,
        lastName: profileGoogle.name.familyName,
        displayName: profileGoogle.displayName,
        email,
        photo: profileGoogle.photos?.[0]?.value,
        rawGoogle: profileGoogle._raw,
      });
    } else {
      user.googleId = profileGoogle.id;
      user.name = profileGoogle.name.givenName;
      user.lastName = profileGoogle.name.familyName;
      user.displayName = profileGoogle.displayName;
      user.photo = profileGoogle.photos?.[0]?.value;
      user.rawGoogle = profileGoogle._raw;
    }

    await user.save();

    const accessToken = jwt.sign(
      {
        sub: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        photo: user.photo,
        roles: [user.role],
        tokenType: "access",
      },
      ENV_JWT.ACCESS_TOKEN_SECRET,
      { expiresIn: ENV_JWT.ACCESS_TOKEN_EXPIRES } as SignOptions
    );

    const refreshToken = jwt.sign(
      {
        sub: user._id,
        email: user.email,
        roles: [user.role],
        tokenType: "refresh",
      },
      ENV_JWT.REFRESH_TOKEN_SECRET,
      { expiresIn: ENV_JWT.REFRESH_TOKEN_EXPIRES } as SignOptions
    );

    return { accessToken, refreshToken };
  }
}
