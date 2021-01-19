const initialState = {
    yearlyReport: null
}

const reportReducer = (state = initialState, action) => {

    switch (action.type) {
        case "GET_REPORT":
            console.log(action.payload);
            return {
                ...state,
                yearlyReport: action.payload
            };
    
        default:
            return state;
    }
}

export default reportReducer;