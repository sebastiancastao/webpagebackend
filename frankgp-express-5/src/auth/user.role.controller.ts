import { Request, Response } from "express";

class UserRoleController {
  // allRoles
  allRoles(req: Request, res: Response) {
    res.json({
      access: "ok",
      message: "Access granted to superadmin",
      role: "allRoles",
    });
  }

  // adminOnly
  admin(req: Request, res: Response) {
    res.json({
      access: "ok",
      message: "Access granted to superadmin",
      role: "admin",
    });
  }

  // superAdminOnly
  superAdmin(req: Request, res: Response) {
    res.json({
      access: "ok",
      message: "Access granted to superadmin",
      role: "superadmin",
    });
  }
}

export default new UserRoleController();
