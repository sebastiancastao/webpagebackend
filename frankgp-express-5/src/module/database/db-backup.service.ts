// src/module/database/db-backup.service.ts

import fs from "fs";
import path from "path";
import { exec } from "child_process";
import mysqldump from "mysqldump";
import mysql from "mysql2/promise";

export class DBBackupService {
  private backupsDir = path.resolve(__dirname, "../../../../backups/db");

  constructor() {
    if (!fs.existsSync(this.backupsDir)) {
      fs.mkdirSync(this.backupsDir, { recursive: true });
    }
  }

  public async backup(): Promise<string> {
    const backupFile = path.join(
      this.backupsDir,
      `mysql-${new Date().toISOString().replace(/[:.Z]/g, "").replace("T", "-").slice(0, -3)}.sql`
    );

    const DB_PASSWORD = process.env.DB_TYPE === "mysql" ? process.env.DB_PASSWORD || "" : process.env.DB_PASSWORD;

    let command: string;
    if (DB_PASSWORD) {
      command = `mysqldump -u ${process.env.DB_USERNAME} -p${DB_PASSWORD} -h ${process.env.DB_HOST} ${process.env.DB_DATABASE} > ${backupFile}`;
    } else {
      command = `mysqldump -u ${process.env.DB_USERNAME} -h ${process.env.DB_HOST} ${process.env.DB_DATABASE} > ${backupFile}`;
    }

    return new Promise((resolve, reject) => {
      exec(command, (error) => {
        if (error) {
          reject(error);
        } else {
          this.cleanupOldBackups();
          resolve(backupFile);
        }
      });
    });
  }

  public async backupNodeJS(): Promise<string> {
    const backupFile = path.join(
      this.backupsDir,
      `mysql-${new Date().toISOString().replace(/[:.Z]/g, "").replace("T", "-").slice(0, -3)}.sql`
    );

    try {
      await mysqldump({
        connection: {
          host: process.env.DB_HOST || "localhost",
          user: process.env.DB_USERNAME || "root",
          password: process.env.DB_PASSWORD || "",
          database: process.env.DB_DATABASE || "test",
        },
        dumpToFile: backupFile,
      });

      this.cleanupOldBackups();

      return backupFile;
    } catch (error) {
      throw new Error(`Error al generar el backup: ${error}`);
    }
  }

  public async restore(backupFile: string): Promise<string> {
    const filePath = path.join(this.backupsDir, backupFile);

    if (!fs.existsSync(filePath)) {
      throw new Error("Backup file does not exist");
    }

    const DB_PASSWORD = process.env.DB_TYPE === "mysql" ? process.env.DB_PASSWORD || "" : process.env.DB_PASSWORD;

    let command: string;
    if (DB_PASSWORD) {
      command = `mysql -u ${process.env.DB_USERNAME} -p${DB_PASSWORD} -h ${process.env.DB_HOST} ${process.env.DB_DATABASE} < ${filePath}`;
    } else {
      command = `mysql -u ${process.env.DB_USERNAME} -h ${process.env.DB_HOST} ${process.env.DB_DATABASE} < ${filePath}`;
    }

    return new Promise((resolve, reject) => {
      exec(command, (error) => {
        if (error) reject(error);
        else resolve("Database restored successfully");
      });
    });
  }

  public async restoreNodeJS(backupFile: string): Promise<string> {
    const filePath = path.join(this.backupsDir, backupFile);

    if (!fs.existsSync(filePath)) {
      throw new Error("Backup file does not exist");
    }

    const sql = fs.readFileSync(filePath, "utf8");
    const dbName = process.env.DB_DATABASE || "test";

    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USERNAME || "root",
      password: process.env.DB_PASSWORD || "",
      multipleStatements: true, // 👈 ¡clave!
    });

    try {
      const dropAndCreate = `
        DROP DATABASE IF EXISTS \`${dbName}\`;
        CREATE DATABASE \`${dbName}\`;
        USE \`${dbName}\`;
      `;

      await connection.query(dropAndCreate + sql);

      await connection.end();
      return "Database restored successfully";
    } catch (error) {
      await connection.end();
      throw new Error(`Error during restore: ${error}`);
    }
  }

  public list() {
    return fs
      .readdirSync(this.backupsDir)
      .filter((file) => file.endsWith(".sql"))
      .map((file) => {
        const filePath = path.join(this.backupsDir, file);
        const stats = fs.statSync(filePath);
        return {
          name: file,
          size: stats.size,
          createdAt: stats.birthtime,
        };
      });
  }

  public delete(filename: string) {
    const filePath = path.join(this.backupsDir, filename);
    if (!fs.existsSync(filePath)) throw new Error("Backup file not found");
    fs.unlinkSync(filePath);
  }

  public rename(oldName: string, newName: string) {
    const oldPath = path.join(this.backupsDir, oldName);
    const newPath = path.join(this.backupsDir, newName);
    if (!fs.existsSync(oldPath)) throw new Error("Backup file not found");
    fs.renameSync(oldPath, newPath);
  }

  private cleanupOldBackups() {
    const files = fs
      .readdirSync(this.backupsDir)
      .filter((file) => file.endsWith(".sql"))
      .sort(
        (a, b) =>
          fs.statSync(path.join(this.backupsDir, b)).mtime.getTime() -
          fs.statSync(path.join(this.backupsDir, a)).mtime.getTime()
      );

    files.slice(7).forEach((file) => {
      fs.unlink(path.join(this.backupsDir, file), (err) => {
        if (err) console.error("Error deleting old backup:", err);
      });
    });
  }

  public getBackupFilePath(filename: string): string {
    const filePath = path.join(this.backupsDir, filename);

    if (!fs.existsSync(filePath)) {
      throw new Error("Backup file not found");
    }

    return filePath;
  }

  public async uploadFile(tempPath: string, originalname: string): Promise<string> {
    if (!originalname.endsWith(".sql")) {
      fs.unlinkSync(tempPath); // Eliminar archivo temporal no válido
      throw new Error("Only .sql files are allowed");
    }

    const targetPath = path.join(this.backupsDir, originalname);

    fs.renameSync(tempPath, targetPath);

    return originalname;
  }
}
