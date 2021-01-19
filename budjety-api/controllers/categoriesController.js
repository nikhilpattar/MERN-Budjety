import Category from '../models/Category.js';

export const getCategory = async (req, res, next) => {
    try {
        const result = await Category.find();
        let iCategory = result[0].incomeCategory;
        let eCategory = result[0].expenseCategory;
        res.status(200).json({iCategory, eCategory});
    } catch (error) {
        res.status(400).json({err_message: 'Failed to fetch categories '+error});
    }
}

export const addCategory = async (req, res, next) => {
    const category = new Category({
        incomeCategory: req.body.incomeCategory,
        expenseCategory: req.body.expenseCategory
    });
    
    try {
        const result = await category.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({err_message: 'Failed to add categories '+error});
    }
}