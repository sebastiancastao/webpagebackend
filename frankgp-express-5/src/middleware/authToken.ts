import { NextFunction, Request, Response } from "express";

const authToken = (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.headers;
  // next();
  if (token === "autenticado") next();
  else res.status(400).json({ message: "Error. Falta autenticación" });
};

export default authToken;
