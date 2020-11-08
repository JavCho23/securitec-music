const DiferentTypeError = require("../../../errors/diferent_type_error");
const CountryRepository = require("../domain/country_repository");

class CountryLister {
  constructor(repository) {
    if (!(repository instanceof CountryRepository))
      throw new DiferentTypeError("CountryRepository");
    this.repository = repository;
  }
  call(page, limit, search) {
    return this.repository.list(page, limit, search);
  }
}

module.exports = CountryLister;
