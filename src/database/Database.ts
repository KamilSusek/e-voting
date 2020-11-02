import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class Database {
  private static instance: Database;
  private db: PrismaClient;

  private constructor() {
    this.db = new PrismaClient();
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }

  public getDatabase(): PrismaClient {
    return this.db;
  }
}

export default Database;
