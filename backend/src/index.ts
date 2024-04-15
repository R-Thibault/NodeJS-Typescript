import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { getSchema } from "./schema";
import { dataSource } from "./datasource";
import sqlite from "sqlite3";
import { dummyCountries } from "./dummyDatas";
import { Country } from "./entities/Country";

async function populateBdd() {
  for (let i = 0; i < dummyCountries.length; i++) {
    try {
      const newCountry = new Country();
      newCountry.country_code = dummyCountries[i].country_code;
      newCountry.name = dummyCountries[i].name;
      newCountry.emoji = dummyCountries[i].emoji;
      newCountry.continent_code = dummyCountries[i].continent_code;

      const datas = await newCountry.save();
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }
}

const database = new sqlite.Database("./bdd.sqlite", (err) => {
  if (err) {
    console.log("Error opening db");
  } else {
    console.log("Db connected");
  }
});
database.get("PRAGMA foreign_keys = ON;");
const start = async () => {
  const schema = await getSchema();

  const server = new ApolloServer({
    schema,
  });

  await dataSource.initialize();
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`🚀  Server ready at ${url}`);
  const country = await Country.findOneBy({ name: "USA" });
  if (!country) {
    await populateBdd();
  }
};

start();
