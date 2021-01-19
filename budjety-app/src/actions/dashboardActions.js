import axios from 'axios';

export const sumOfIncomes = (uId) =>
    async (dispatch) => {
        try {
            await axios.get(`http://localhost:3800/income/sum/${uId}`)
                .then(res => {
                    dispatch(
                        {
                            type: "SUM_OF_INCOMES",
                            payload: res.data
                        }
                    )
                })
        } catch (error) {
            console.log(error);
        }
    }

export const sumOfExpenses = (uId) =>
    async (dispatch) => {
        try {
            await axios.get(`http://localhost:3800/expense/sum/${uId}`)
                .then(res => {
                    dispatch(
                        {
                            type: "SUM_OF_EXPENSES",
                            payload: res.data
                        }
                    )
                }).catch(error => {
                    console.log(error);
                })
        } catch (error) {
            console.log(error);
        }
    }

export const setValuesToZero = () =>
    async (dispatch) => {
        try {
            dispatch(
                {
                    type: "SET_VALUES_TO_ZERO"
                }
            )
        } catch (error) {
            console.log(error);
        }
    }

export const getCategories = (type) =>
    async (dispath) => {
        try {
            await axios.get('http://localhost:3800/categories/')
            .then(res =>{
                dispath({
                    type: "GET_CATEGORIES",
                    incomeCategory: res.data.iCategory,
                    expenseCategory: res.data.eCategory,
                    categoryType: type
                })
            })
        } catch (error) {
            console.log(error);
        }
    }

export const getFilteredResults = (filter) =>
    async (dispatch) =>{
        try {
            await axios.post(`http://localhost:3800/${filter.type}/filter/${filter.uId}`, filter)
            .then(res =>{
                dispatch({
                    type: "GET_FILTERED_RESULTS",
                    payload: res.data.filteredCategory,
                    chartDetails: res.data.chartResults
                })
            })
        } catch (error) {
            
        }
    }

export const resetFilter = () =>
    async (dispatch) => {
        try {
            dispatch(
                {
                    type: "RESET_FILTER"
                }
            )
        } catch (error) {
            console.log(error);
        }
    }