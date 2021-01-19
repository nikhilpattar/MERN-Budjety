const initialState = {
    totalIncome: 0,
    totalExpense: 0,
    incomeCategory: null,
    expenseCategory: null,
    filteredResults: null,
    chartMonthlyResults: null
}

const dashboardReducer = (state = initialState, action) => {

    switch (action.type) {
        case "SUM_OF_INCOMES":
            return {
                ...state,
                totalIncome: action.payload
            }
        case "SUM_OF_EXPENSES":
            return {
                ...state,
                totalExpense: action.payload
            }
        case "SET_VALUES_TO_ZERO":
            return {
                totalIncome: 0,
                totalExpense: 0
            }
        case "GET_CATEGORIES":
            if (action.categoryType === 'income') {
                return {
                    ...state,
                    incomeCategory: action.incomeCategory,
                    expenseCategory: null
                }
            } else {
                return {
                    ...state,
                    expenseCategory: action.expenseCategory,
                    incomeCategory: null
                }
            }
        case "GET_FILTERED_RESULTS":
            return {
                ...state,
                filteredResults: action.payload,
                chartMonthlyResults: action.chartDetails
            }

        case "RESET_FILTER":
            return {
                ...state,
                filteredResults: null,
                chartMonthlyResults: null
            }


        default:
            return state;
    }
}

export default dashboardReducer;