const Country = require("../domain/country");
const CountryRepository = require("../domain/country_repository");
const db = require("../../../db/mysql");
class MySqlCountryRepository extends CountryRepository {
  async list(page, limit, search) {
    const countries = await db.doQuery(
      `SELECT id, alpha_3_code as code, nationality, en_short_name as name FROM countries WHERE  en_short_name LIKE ? ORDER BY id LIMIT ? OFFSET ? `,
      [search + "%", parseInt(limit), (page - 1) * limit]
    );
    return countries.map(
      (country) =>
        new Country(country.id, country.name, country.code, country.nationality)
    );
  }
}

module.exports = MySqlCountryRepository;
