const initialState = {
    incomeList: null,
    isIncomeAdded: false,
    isIncomeDeleted: false
}

const incomeReducer = (state = initialState, action) => {

    switch (action.type) {

        case "GET_INCOMES":
            return {
                ...state,
                incomeList: action.payload
            }

        case "ADD_INCOME":
            return {
                incomeList: action.payload,
                isIncomeAdded: true
            }

        case "DELETE_INCOME":
            return {
                incomeList: action.payload,
                isIncomeDeleted: true
            }

        default:
            return state;
    }
}

export default incomeReducer;