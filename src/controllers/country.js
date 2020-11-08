const request = require("../helpers/request");
const pagination = require("../helpers/pagination");
const CountryLister = require("../core/country/aplication/country_lister");
const CountryRepository = require("../core/country/infrastructure/mysql_country_repository");
exports.list = async function (req, res) {
  try {
    const countryLister = new CountryLister(new CountryRepository());
    const params = request.getFilteringOptions(req, ["search"]);
    const options = pagination.getPaginationOptions(req);
    const countries = await countryLister.call(
      options.page,
      options.limit,
      params.search ? params.search : ""
    );
    pagination.setPaginationHeaders(res, {
      page: options.page,
      limit: options.limit,
    });
    res.json(countries.map((country) => country.toJson()));
  } catch (error) {
    console.log(error);
    res.status(error.responseCode).json({ message: error.message });
  }
};
