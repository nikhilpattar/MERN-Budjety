import axios from 'axios';

export const getIncomes = (uId) =>
    async (dispatch) => {
        try {
            await axios.get(`http://localhost:3800/income/forum/${uId}`)
                .then(res => {
                    dispatch(
                        {
                            type: "GET_INCOMES",
                            payload: res.data
                        }
                    )
                })
        } catch (error) {
            console.log(error);
        }
    }

export const addIncome = (income) =>
    async (dispatch) => {
        try {
            await axios.post('http://localhost:3800/income', income)
                .then(res => {
                    dispatch(
                        {
                            type: "ADD_INCOME",
                            payload: res.data
                        }
                    )
                })
        } catch (error) {
            console.log(error);
        }
    }

export const deleteIncome = (id) =>
    async (dispatch) => {
        try {
            await axios.delete(`http://localhost:3800/income/${id}`)
                .then(res => {
                    dispatch(
                        {
                            type: "DELETE_INCOME",
                            payload: res.data
                        }
                    )
                })
        } catch (error) {
            console.log(error);
        }
    }
