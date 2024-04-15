import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions";
import { DataSource } from "typeorm";
import { Country } from "./entities/Country";

export const dataSourceOptions: SqliteConnectionOptions = {
  type: "sqlite",
  entities: [Country],
  database: "./bdd.sqlite",
  synchronize: true,
};
export const dataSource = new DataSource({
  ...dataSourceOptions,
});
