import { EmailService } from "../module/mail/email.service";
import { ENV_JWT } from "../config/envs";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import UserModel, { UserRole } from "./models/user.model";

export class AuthMongoDBService {
  private emailService = new EmailService();

  async getUserByEmail(email: string) {
    return await UserModel.findOne({ email }).select("-password");
  }

  async register(body: any) {
    const existing = await UserModel.findOne({ email: body.email });
    if (existing) throw new Error("Email already registered");

    const hashed = await bcrypt.hash(body.password, 10);
    const newUser = new UserModel({ ...body, password: hashed });
    return await newUser.save();
  }

  async login(body: any) {
    const { email, password } = body;
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password || "");
    if (!isPasswordValid) return null;

    const userRoles =
      user.role === UserRole.SUPERADMIN
        ? [UserRole.SUPERADMIN]
        : user.role === UserRole.ADMIN
        ? [UserRole.ADMIN]
        : user.role === UserRole.COLLABORATOR
        ? [UserRole.COLLABORATOR]
        : [UserRole.USER];

    const userPayload = {
      sub: user._id,
      userId: user._id,
      email: user.email,
      roles: userRoles,
      // photo: user.photo,
    };

    const tokens = this.generateTokens(userPayload);

    const decodedAccess = jwt.decode(tokens.accessToken) as JwtPayload;
    const loginDate = new Date().toLocaleString();
    const expirationDate = decodedAccess?.exp ? new Date(decodedAccess.exp * 1000).toLocaleString() : null;

    const { password: _, ...userData } = user.toObject();

    return {
      login: true,
      user: {
        ...userData,
      },
      loginDate,
      expirationDate,
      currentDate: new Date().toLocaleString(),
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  decodeToken(token: string) {
    const decoded = jwt.decode(token) as JwtPayload;
    if (!decoded) return null;

    const createdDate = decoded.iat ? new Date(decoded.iat * 1000) : null;
    const expirationDate = decoded.exp ? new Date(decoded.exp * 1000) : null;
    const currentDate = new Date();

    let status = "unknown";
    if (expirationDate) {
      status = expirationDate > currentDate ? "active" : "expired";
    }

    return {
      ...decoded,
      status,
      tokenType: decoded.tokenType || "unknown",
      createdDate: createdDate?.toLocaleString() || null,
      expirationDate: expirationDate?.toLocaleString() || null,
      currentDate: currentDate.toLocaleString(),
    };
  }

  generateTokens(payload: any) {
    const accessPayload = { ...payload, tokenType: "access" };
    const refreshPayload = { ...payload, tokenType: "refresh" };

    const accessToken = jwt.sign(accessPayload, ENV_JWT.ACCESS_TOKEN_SECRET, {
      expiresIn: ENV_JWT.ACCESS_TOKEN_EXPIRES,
    } as SignOptions);
    const refreshToken = jwt.sign(refreshPayload, ENV_JWT.REFRESH_TOKEN_SECRET, {
      expiresIn: ENV_JWT.REFRESH_TOKEN_EXPIRES,
    } as SignOptions);

    return { accessToken, refreshToken };
  }

  verifyRefreshToken(token: string) {
    try {
      return jwt.verify(token, ENV_JWT.REFRESH_TOKEN_SECRET);
    } catch {
      return null;
    }
  }

  async forgotPassword(email: string, baseURL: string): Promise<string> {
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("Email not found");

    const tokenPayload = {
      email: user.email,
      userId: user._id,
      tokenType: "reset",
    };

    const resetToken = jwt.sign(tokenPayload, ENV_JWT.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });

    const resetLink = `${baseURL}/reset-password?token=${resetToken}`;
    await this.emailService.sendResetPasswordEmail(email, resetLink);

    return resetToken;
  }

  async restorePassword(resetToken: string, newPassword: string): Promise<boolean> {
    try {
      const decoded = jwt.verify(resetToken, ENV_JWT.ACCESS_TOKEN_SECRET) as JwtPayload;

      if (!decoded || decoded.tokenType !== "reset") throw new Error("Invalid token");

      const user = await UserModel.findById(decoded.userId);
      if (!user) throw new Error("User not found");

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();

      return true;
    } catch {
      return false;
    }
  }

  async checkExistence({ email, username }: { email?: string; username?: string }) {
    const [emailExists, usernameExists] = await Promise.all([
      email ? UserModel.exists({ email }) : Promise.resolve(null),
      username ? UserModel.exists({ username }) : Promise.resolve(null),
    ]);

    return {
      email: !!emailExists,
      username: !!usernameExists,
    };
  }
}
