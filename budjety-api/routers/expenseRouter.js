import express from 'express';
import {
    getExpenses, addExpense, deleteExpense,
    sumOfExpenses, filteredExpenses
} from '../controllers/expenseController.js';

const expenseRouter = express.Router();

expenseRouter.route('/filter/:uId').post(filteredExpenses);

expenseRouter.route('/').post(addExpense);

expenseRouter.route('/forum/:uId').get(getExpenses)

expenseRouter.route('/:id').delete(deleteExpense);

expenseRouter.route('/sum/:uId').get(sumOfExpenses);

export default expenseRouter;