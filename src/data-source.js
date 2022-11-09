import typeorm from "typeorm";
import testEntity from "./test.entity.js";
import "reflect-metadata";
import "dotenv/config";
export const dataSource = new typeorm.DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [testEntity],
});
