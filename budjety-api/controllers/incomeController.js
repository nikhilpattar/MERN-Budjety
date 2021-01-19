import Income from '../models/Income.js';

let incomeList = [];
let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'];

export const getIncomes = async (req, res, next) => {
    try {
        const incomeData = await Income.find({ uId: req.params.uId });
        incomeList = incomeData;
        res.status(200).json(incomeData);
    } catch (error) {
        res.status(400).json({ err_message: 'Failed to fetch income data ' + error });
    }
}

export const addIncome = async (req, res, next) => {

    let date = new Date();
    let id = req.body.uId + date.getTime();
    let month = months[date.getMonth()];
    let year = date.getFullYear();

    const income = new Income(
        {
            iId: id,
            uId: req.body.uId,
            iDescription: req.body.iDescription,
            iValue: req.body.iValue,
            iCategory: req.body.iCategory,
            iMonth: month,
            iYear: year
        }
    );
    try {
        const incomeDataPost = await income.save();
        incomeList.push(incomeDataPost);
        res.status(200).json(incomeList);
    } catch (error) {
        res.status(400).json({ err_message: `Failed to add income ` + error });
    }
}

export const deleteIncome = async (req, res, next) => {

    let id = req.params.id;

    try {
        await Income.deleteOne({ iId: id });
        incomeList = incomeList.filter(income => {
            return income.iId !== id;
        });
        res.status(200).json(incomeList);
    } catch (error) {
        res.status(400).json({ err_message: `Failed to delete income ` + error });
    }
}

export const sumOfIncomes = async (req, res, next) => {
    try {
        const result = await Income.aggregate([{ $match: { uId: req.params.uId } },
        { $group: { _id: null, sum: { $sum: "$iValue" } } }]);
        res.status(200).json(result[0].sum);
    } catch (error) {
        res.status(400).json({ err_message: `Failed to get sum of incomes ` + error });
    }
}

export const filteredIncomes = async (req, res, next) => {
    try {
        const filteredCategory = await Income.find({
            uId: req.params.uId,
            iCategory: req.body.category,
            iMonth: req.body.month,
            iYear: req.body.year
        });
        const chartResults = await Income.find({
            uId: req.params.uId,
            iMonth: req.body.month,
            iYear: req.body.year
        });
        res.status(200).json({ filteredCategory, chartResults });
    } catch (error) {
        res.status(400).json({ err_message: 'Failed to filter income results ' + error })
    }
}
