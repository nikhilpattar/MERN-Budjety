import express from 'express';
import {
    getIncomes, addIncome, deleteIncome,
    sumOfIncomes, filteredIncomes, incomeSpecificFilter
} from '../controllers/incomeController.js';

const incomeRouter = express.Router();

incomeRouter.route('/filter/:uId').post(filteredIncomes);

incomeRouter.route('/').post(addIncome);

incomeRouter.route('/forum/:uId').get(getIncomes);

incomeRouter.route('/:id').delete(deleteIncome);

incomeRouter.route('/sum/:uId').get(sumOfIncomes)

export default incomeRouter;