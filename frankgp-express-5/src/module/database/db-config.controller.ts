import { runSeeders } from "../../config/seeder";
import { DBConfigService } from "./db-config.service";

export class DBConfigController {
  private service = new DBConfigService();

  async dropAndSync(req: any, res: any) {
    const result = await this.service.dropAndSync();
    res.json(result);
  }

  async runSeeders(req: any, res: any) {
    const result = await runSeeders();
    res.json(result);
  }

  async dropAndSeed(req: any, res: any) {
    const result = await this.service.dropAndSeed();
    res.json(result);
  }

  async runSQLQuery(req: any, res: any) {
    const { query } = req.body;

    if (!query || typeof query !== "string") {
      return res.status(400).json({ error: "Query must be a valid string." });
    }

    const result = await this.service.runSQLQuery(query);
    res.json(result);
  }
}
