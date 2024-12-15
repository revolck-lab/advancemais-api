// controllers/budgetController.js
const budgetService = require('../services/budgetService');

const budgetController = {
  createBudget: async (req, res) => {
    try {
      const quotes = req.body;
      const id = await budgetService.createBudget(quotes);
      return res.status(201).json({ id, message: 'Budget created successfully' });
    } catch (error) {
      return res.status(500).json({ error: error.message || 'Failed to create budget' });
    }
  },

  listBudgets: async (req, res) => {
    try {
      const budgets = await budgetService.listBudgets();
      return res.status(200).json(budgets);
    } catch (error) {
      return res.status(500).json({ error: error.message || 'Failed to fetch budgets' });
    }
  },

  getBudgetById: async (req, res) => {
    try {
      const { id } = req.params;
      const budget = await budgetService.getBudgetById(id);
      return res.status(200).json(budget);
    } catch (error) {
      return res.status(404).json({ error: error.message || 'Budget not found' });
    }
  },

  updateBudget: async (req, res) => {
    try {
      const { id } = req.params;
      const quotes = req.body;
      await budgetService.updateBudget(id, quotes);
      return res.status(200).json({ message: 'Budget updated successfully' });
    } catch (error) {
      return res.status(404).json({ error: error.message || 'Failed to update budget' });
    }
  },

  deleteBudget: async (req, res) => {
    try {
      const { id } = req.params;
      await budgetService.deleteBudget(id);
      return res.status(200).json({ message: 'Budget deleted successfully' });
    } catch (error) {
      return res.status(404).json({ error: error.message || 'Failed to delete budget' });
    }
  },
};

module.exports = budgetController;
