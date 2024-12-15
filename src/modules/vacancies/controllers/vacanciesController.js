const vacanciesService = require("../services/vacanciesService");

const vacanciesController = {
  listVacancies: async (req, res) => {
    try {
      const vacancies = await vacanciesService.listVacancies(req.body);
      return res.status(200).json(vacancies);
    } catch (err) {
      if (err.isValidationError) {
        return res.status(400).json({ status: 'validation_error', errors: err.details });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
  
  getVacancyDetails: async (req, res) => {
    try {
      const { id } = req.params;

      if (isNaN(id) || id <= 0) {
        return res.status(400).json({ error: 'Invalid vacancy ID' });
      }

      const vacancy = await vacancyModel.findById(id);

      if (!vacancy) {
        return res.status(404).json({ error: 'Vacancy not found' });
      }

      return res.status(200).json(vacancy);
    } catch(error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = vacanciesController;
