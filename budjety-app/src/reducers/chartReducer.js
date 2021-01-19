const initialState = {
    chartResults: null
}

const chartReducer = (state = initialState, action) =>{

    switch (action.type) {
        case "GET_CHART_RESULTS":
            return {
                chartResults: action.payload
            };
    
        default:
            return state;
    }
}

export default chartReducer;