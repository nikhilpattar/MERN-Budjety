import Income from '../models/Income.js';
import Expense from '../models/Expense.js';

export const reportFilter = async (req, res, next) => {

    try {
        const incomeDetails = await Income.find({ uId: req.params.uId, iYear: req.body.year });
        const expenseDetails = await Expense.find({ uId: req.params.uId, eYear: req.body.year });
        let income = evaluateIncome(incomeDetails);
        let expense = evaluateExpense(expenseDetails);
        let yearResult = {
            totalIncome: income.total,
            totalExpense: expense.total,
            salary: income.sub[0],
            house: income.sub[1],
            business: income.sub[2],
            othersIncome: income.sub[3],
            travel: expense.sub[0],
            electric:expense.sub[1],
            water:expense.sub[2],
            insurance:expense.sub[3],
            groceries:expense.sub[4],
            gadgets:expense.sub[5],
            maintainance:expense.sub[6],
            repairs:expense.sub[7],
            othersExpense:expense.sub[8]
        }
        res.status(200).json({yearResult});
    } catch (error) {
        res.status(400).json({ err_message: 'Failed to fetch income and expense details' + error });
    }
}

let evaluateIncome = (results) => {
    let income = {
        total: 0,
        sub: [0, 0, 0, 0]
    }

    results.forEach(element => {
        if (element.iCategory === "Salary") {
            income.sub[0] += element.iValue;
        }
        else if (element.iCategory === "House/Rent") {
            income.sub[1] += element.iValue;
        }
        else if (element.iCategory === "Business/Profession") {
            income.sub[2] += element.iValue;
        }
        else if (element.iCategory === "Others") {
            income.sub[3] += element.iValue;
        }
        income.total += element.iValue;
    });
    income.total = income.total.toLocaleString();
    income.sub = income.sub.map(value =>{
        return value.toLocaleString();
    })
    return income;
}

let evaluateExpense = (results) => {
    let expense = {
        total: 0,
        sub: [0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
    results.forEach(element => {
        if (element.eCategory === "Travel") {
            expense.sub[0] += element.eValue;
        } else if (element.eCategory === "Electric Bill") {
            expense.sub[1] += element.eValue;
        } else if (element.eCategory === "Water Bill") {
            expense.sub[2] += element.eValue;
        } else if (element.eCategory === "Insurance") {
            expense.sub[3] += element.eValue;
        } else if (element.eCategory === "Groceries") {
            expense.sub[4] += element.eValue;
        } else if (element.eCategory === "Gadgets") {
            expense.sub[5] += element.eValue;
        } else if (element.eCategory === "Maintainance") {
            expense.sub[6] += element.eValue;
        } else if (element.eCategory === "Repairs") {
            expense.sub[7] += element.eValue;
        } else if (element.eCategory === "Others") {
            expense.sub[8] += element.eValue;
        }
        expense.total += element.eValue;
    });
    expense.total = expense.total.toLocaleString();
    expense.sub = expense.sub.map(value =>{
        return value.toLocaleString();
    })
    return expense;
}