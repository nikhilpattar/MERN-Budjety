const initialState = {
    expenseList: null,
    isExpenseAdded: false,
    isExpenseDeleted: false
}

const expenseReducer = (state = initialState, action) => {

    switch (action.type) {
        
        case "GET_EXPENSES":
            return {
                ...state,
                expenseList: action.payload
            }

        case "ADD_EXPENSE":
            return {
                expenseList: action.payload,
                isExpenseAdded: true
            }

        case "DELETE_EXPENSE":
            return {
                expenseList: action.payload,
                isExpenseDeleted: true
            }
        

        default:
            return state;
    }
}

export default expenseReducer;