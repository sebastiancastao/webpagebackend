import { Request, Response } from "express";
import { WardrobeUserService } from "./wardrobe-user.service";

export class WardrobeUserController {
  constructor(private service = new WardrobeUserService()) {}

  async findAll(req: Request, res: Response) {
    const users = await this.service.findAll();
    res.json(users);
  }

  async findOne(req: Request, res: Response) {
    const id = req.params.id;
    const user = await this.service.findOne(id);
    res.json(user);
  }

  async create(req: Request, res: Response) {
    const newUser = await this.service.create(req.body);
    res.status(201).json(newUser);
  }

  async update(req: Request, res: Response) {
    const id = req.params.id;
    const updatedUser = await this.service.update(id, req.body);
    res.json(updatedUser);
  }

  async remove(req: Request, res: Response) {
    const id = req.params.id;
    await this.service.remove(id);
    res.status(204).send();
  }

  async findByUsername(req: Request, res: Response) {
    const username = req.params.username;
    const user = await this.service.findByUsername(username);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  }
}
