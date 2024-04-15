import { buildSchema } from "type-graphql";
import { CountryResolver } from "./resolvers/Countries";

export async function getSchema() {
  return await buildSchema({
    resolvers: [CountryResolver],
  });
}
