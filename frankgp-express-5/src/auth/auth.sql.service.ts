import { AppDataSource } from "../config/typeOrmConfig";
import { ENV_JWT } from "../config/envs";
import { Repository } from "typeorm";
import { RolesEnum } from "./enum/roles.enum";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { selectUserEntity } from "./utils/selectUserEntity";

export class AuthSQLService {
  private repo: Repository<any>;

  constructor() {
    this.repo = AppDataSource.getRepository(selectUserEntity());
  }

  async getUserByEmail(email: string) {
    const user = await this.repo.findOne({
      where: { email },
      relations: [], // agrega relaciones si necesitas
    });

    if (!user) return null;

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async register(body: any) {
    const existing = await this.repo.findOneBy({ email: body.email });
    if (existing) throw new Error("Email already registered");

    const hashed = await bcrypt.hash(body.password, 10);
    const user = this.repo.create({ ...body, password: hashed });
    return await this.repo.save(user);
  }

  async login(body: any) {
    const { email, password } = body;
    const findEmail = await this.repo.findOneBy({ email });
    if (!findEmail) return null;

    const isPasswordValid = await bcrypt.compare(password, findEmail.password);
    if (!isPasswordValid) return null;

    const { password: _, ...user } = findEmail;

    const userRoles =
      findEmail.role === "superadmin"
        ? [RolesEnum.SuperAdmin]
        : findEmail.role === "admin"
        ? [RolesEnum.Admin]
        : findEmail.role === "collaborator"
        ? [RolesEnum.Collaborator]
        : [RolesEnum.User];

    const userPayload = {
      sub: findEmail._id,
      userId: findEmail._id,
      email: findEmail.email,
      roles: userRoles,
      // photo: findEmail.photo,
    };

    const tokens = this.generateTokens(userPayload);

    const decodedAccess = jwt.decode(tokens.accessToken) as JwtPayload;
    const loginDate = new Date().toLocaleString();
    const expirationDate = decodedAccess?.exp ? new Date(decodedAccess.exp * 1000).toLocaleString() : null;

    return {
      login: true,
      user: {
        ...user,
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

  async forgotPassword(email: string): Promise<string> {
    const user = await this.repo.findOneBy({ email });
    if (!user) throw new Error("Email not found");

    const tokenPayload = {
      email: user.email,
      userId: user._id,
      tokenType: "reset",
    };

    const resetToken = jwt.sign(tokenPayload, ENV_JWT.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    } as SignOptions);

    // Aquí podrías enviar el token por correo (ej. con nodemailer)
    return resetToken;
  }

  async restorePassword(resetToken: string, newPassword: string): Promise<boolean> {
    try {
      const decoded = jwt.verify(resetToken, ENV_JWT.ACCESS_TOKEN_SECRET) as JwtPayload;

      if (!decoded || decoded.tokenType !== "reset") throw new Error("Invalid token");

      const user = await this.repo.findOneBy({ _id: decoded.userId });
      if (!user) throw new Error("User not found");

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await this.repo.save(user);

      return true;
    } catch {
      return false;
    }
  }

  async checkExistence({ email, username }: { email?: string; username?: string }) {
    const conditions: any = [];
    if (email) conditions.push({ email });
    if (username) conditions.push({ username });

    if (conditions.length === 0) return {};

    const found = await this.repo.find({
      where: conditions,
    });

    return {
      email: found.some((u) => u.email === email),
      username: found.some((u) => u.username === username),
    };
  }
}
