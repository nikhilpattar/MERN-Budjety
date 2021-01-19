import Expense from '../models/Expense.js';

let expenseList = [];
let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'];

export const getExpenses = async (req, res, next) => {
    try {
        const expenseData = await Expense.find({ uId: req.params.uId });
        expenseList = expenseData;
        res.status(200).json(expenseData);
    } catch (error) {
        res.status(400).json({ err_message: 'Failed to fetch expense data' });
    }
}

export const addExpense = async (req, res, next) => {

    let date = new Date();
    let id = req.body.uId + date.getTime();
    let month = months[date.getMonth()];
    let year = date.getFullYear();

    const expense = new Expense(
        {
            eId: id,
            uId: req.body.uId,
            eDescription: req.body.eDescription,
            eValue: req.body.eValue,
            eCategory: req.body.eCategory,
            eMonth: month,
            eYear: year
        }
    );
    try {
        const expenseDataPost = await expense.save();
        expenseList.push(expenseDataPost);
        res.status(200).json(expenseList);
    } catch (error) {
        res.status(400).json({ err_message: `Failed to add expense` });
    }
}

export const deleteExpense = async (req, res, next) => {

    let id = req.params.id;

    try {
        await Expense.deleteOne({ eId: id });
        expenseList = expenseList.filter(expense => {
            return expense.eId !== id;
        })
        res.status(200).json(expenseList);
    } catch (error) {
        res.status(400).json({ err_message: `Failed to delete expense` });
    }
}

export const sumOfExpenses = async (req, res, next) => {
    try {
        const result = await Expense.aggregate([{ $match: { uId: req.params.uId } },
        { $group: { _id: null, sum: { $sum: "$eValue" } } }]);
        res.status(200).json(result[0].sum);
    } catch (error) {
        res.status(400).json({ err_message: `Failed to get sum of expenses` + error });
    }
}

export const filteredExpenses = async (req, res, next) => {
    try {
        const filteredCategory = await Expense.find({
            uId: req.params.uId,
            eCategory: req.body.category,
            eMonth: req.body.month,
            eYear: req.body.year
        });
        const chartResults = await Expense.find({
            uId: req.params.uId,
            eMonth: req.body.month,
            eYear: req.body.year
        });
        res.status(200).json({ filteredCategory, chartResults });
    } catch (error) {
        res.status(400).json({ err_message: 'Failed to filter expense and charts results ' + error })
    }
}
