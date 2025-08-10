// src/module/auth/oauth-sql.service.ts

import { AppDataSource } from "../config/typeOrmConfig";
import { ENV_JWT } from "../config/envs";
import { selectUserEntity } from "./utils/selectUserEntity";
import { Repository } from "typeorm";
import jwt, { SignOptions } from "jsonwebtoken";

export class OAuthSQLService {
  private repo: Repository<any>;

  constructor() {
    this.repo = AppDataSource.getRepository(selectUserEntity());
  }

  async handleOAuth(profileGoogle: any): Promise<{ accessToken: string; refreshToken: string }> {
    const email = profileGoogle.emails?.[0]?.value || "";

    let user = await this.repo.findOne({ where: { email } });

    if (!user) {
      user = this.repo.create({
        googleId: profileGoogle.id,
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

    await this.repo.save(user);

    const accessToken = jwt.sign(
      {
        ...user,
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
        userId: user._id,
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
