const initialState = {
    isRegistered: false
}

const registerReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_USER":
            return {
                ...state,
                isRegistered: action.payload ? true : false
            };

        default:
            return state;
    }
}

export default registerReducer;
