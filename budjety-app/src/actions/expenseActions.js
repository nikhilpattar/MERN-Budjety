import axios from 'axios';

export const getExpenses = (uId) =>
    async (dispatch) => {
        try {
            await axios.get(`http://localhost:3800/expense/forum/${uId}`)
                .then(res => {
                    dispatch(
                        {
                            type: "GET_EXPENSES",
                            payload: res.data
                        }
                    )
                })
        } catch (error) {
            console.log(error);
        }
    }

export const addExpense = (expense) =>
    async (dispatch) => {
        try {
            await axios.post('http://localhost:3800/expense', expense)
                .then(res => {
                    dispatch(
                        {
                            type: "ADD_EXPENSE",
                            payload: res.data
                        }
                    )
                })
        } catch (error) {
            console.log(error);
        }
    }

export const deleteExpense = (id) =>
    async (dispatch) => {
        try {
            await axios.delete(`http://localhost:3800/expense/${id}`)
                .then(res => {
                    dispatch(
                        {
                            type: "DELETE_EXPENSE",
                            payload: res.data
                        }
                    )
                })
        } catch (error) {
            console.log(error);
        }
    }
