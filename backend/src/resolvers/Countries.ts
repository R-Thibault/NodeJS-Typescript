import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Country, CountryCreateInput } from "../entities/Country";

@Resolver()
export class CountryResolver {
  @Query(() => [Country])
  async getAllCountries(): Promise<Country[]> {
    return await Country.find();
  }

  @Query(() => Country)
  async getCountryByCountryCode(
    @Arg("country_code") country_code: string
  ): Promise<Country | null> {
    try {
      const country = await Country.findOne({
        where: { country_code: country_code },
      });
      return country;
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  @Query(() => [Country])
  async getCountriesByContinentCode(
    @Arg("continent_code") continent_code: string
  ): Promise<Country[] | null> {
    try {
      const country = await Country.find({
        where: { continent_code: continent_code },
      });
      return country;
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }

  @Mutation(() => Country)
  async createCountry(
    @Arg("data", () => CountryCreateInput) data: CountryCreateInput
  ): Promise<Country> {
    try {
      const newCountry = new Country();
      newCountry.country_code = data.country_code;
      newCountry.name = data.name;
      newCountry.emoji = data.emoji;
      newCountry.continent_code = data.continent_code;

      const datas = await newCountry.save();
      return datas;
    } catch (error) {
      throw new Error(`error occured ${JSON.stringify(error)}`);
    }
  }
}
