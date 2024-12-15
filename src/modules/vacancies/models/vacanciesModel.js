const knexInstance = require("../../../config/db");

const vacancyModel = {
  list: async (filters, limit, offset) => {
    const db = await knexInstance();
    const query = db("vacancy")
      .select(
        "vacancy.id",
        "vacancy.title",
        "vacancy.published_date",
        "vacancy.city",
        "vacancy.state_id",
        "area.name as area_name",
        "company.name as company_name"
      )
      .join("area", "vacancy.area_id", "area.id")
      .join("company", "vacancy.company_id", "company.id")
      .where({ status: 1 })
      .orderBy("vacancy.published_date", "desc");

    if (filters.city) query.where("vacancy.city", "like", `%${filters.city}%`);
    if (filters.company_id) query.where("vacancy.company_id", filters.company_id);
    if (filters.state_id) query.where("vacancy.state_id", filters.state_id);
    if (filters.published_date) query.where("vacancy.published_date", filters.published_date);
    if (filters.area_id) query.where("vacancy.area_id", filters.area_id);

    if (limit) query.limit(limit);
    if (offset) query.offset(offset);

    const results = await query;
    return results;
  },
  findById: async (id) => {
    const db = await knexInstance();
    return db('vacancy')
      .select(
        'vacancy.id',
        'vacancy.title',
        'vacancy.requirements',
        'vacancy.activities',
        'vacancy.benefits',
        'vacancy.notes',
        'vacancy.start_date',
        'vacancy.end_date',
        'vacancy.status',
        'vacancy.published_date',
        'company.name as company_name',
        'area.name as area_name',
        'state.name as state_name'
      )
      .join('company', 'vacancy.company_id', '=', 'company.id')
      .join('area', 'vacancy.area_id', '=', 'area.id')
      .join('state', 'vacancy.state_id', '=', 'state.id')
      .where('vacancy.id', id)
      .first();
  },
};

module.exports = vacancyModel;
