const vacanciesService = require("../services/vacanciesService");

const vacanciesController = {
  listVacancies: async (req, res) => {
    try {
      const { company_id, created_at, limit, offset } = req.query;

      if (limit && (isNaN(limit) || limit <= 0)) {
        return res.status(400).json({ error: "Invalid limit parameter" });
      }
      if (offset && (isNaN(offset) || offset < 0)) {
        return res.status(400).json({ error: "Invalid offset parameter" });
      }

      const vacancies = await vacanciesService.listVacancies({
        company_id,
        created_at,
        limit,
        offset,
      });

      return res.status(200).json({
        message: "Vacancies retrieved successfully",
        data: vacancies,
      });
    } catch (err) {
      console.error("Error retrieving vacancies:", err.message);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  getVacancyDetails: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id || !Number.isInteger(Number(id)) || id <= 0) {
        return res.status(400).json({ error: "Invalid vacancy ID" });
      }

      const vacancy = await vacanciesService.getVacancyDetails(id);

      if (!vacancy) {
        return res.status(404).json({ error: "Vacancy not found" });
      }

      return res.status(200).json({
        message: "Vacancy details retrieved successfully",
        data: vacancy,
      });
    } catch (error) {
      console.error("Error retrieving vacancy details:", error.message);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = vacanciesController;
