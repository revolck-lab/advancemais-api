// routes/budgetRoutes.js
const express = require("express");
const budgetController = require("../controllers/budgetController");

const router = express.Router();

router.post("/budgets", budgetController.createBudget);
router.get("/budgets", budgetController.listBudgets);
router.get("/budgets/:id", budgetController.getBudgetById);
router.delete("/budgets/:id", budgetController.deleteBudget);

module.exports = router;
