const vacancyModel = require("../models/vacanciesModel");

const MAX_LIMIT = 100;

const cleanFilters = (filters) => {
  const cleanedFilters = {};
  for (const key in filters) {
    if (filters[key] != null) {
      cleanedFilters[key] = filters[key];
    }
  }
  return cleanedFilters;
};

const vacanciesService = {
  listVacancies: async (queryParams) => {
    const {
      city,
      company_id,
      state_id,
      published_date,
      area_id,
      limit,
      offset,
    } = queryParams;

    const filters = {
      city,
      company_id,
      state_id,
      published_date,
      area_id,
    };

    const paginationLimit = Math.min(parseInt(limit, 10) || 10, MAX_LIMIT);
    const paginationOffset = parseInt(offset, 10) || 0;

    const cleanedFilters = cleanFilters(filters);

    const vacancies = await vacancyModel.list(
      cleanedFilters,
      paginationLimit,
      paginationOffset
    );

    return vacancies;
  },
};

module.exports = vacanciesService;
