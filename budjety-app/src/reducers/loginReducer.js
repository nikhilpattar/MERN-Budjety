const initialState = {
    uId: localStorage.getItem('token') ? localStorage.getItem('uId') : '',
    firstName: localStorage.getItem('token') ? localStorage.getItem('firstName') : '',
    lastName: localStorage.getItem('token') ? localStorage.getItem('lastName') : '',
    token: localStorage.getItem('token'),
    isAuthenticated: localStorage.getItem('token') ? true : false
}

const loginReducer = (state = initialState, action) => {

    switch (action.type) {
        case "VALIDATE_USER":
            localStorage.setItem('token', action.payload);
            localStorage.setItem('uId', action.uId);
            localStorage.setItem('firstName', action.firstName);
            localStorage.setItem('lastName', action.lastName);
            return {
                token: action.payload,
                isAuthenticated: true,
                firstName: action.firstName,
                lastName: action.lastName,
                uId: action.uId
            };
        case "LOGOUT_USER":
            return {
                isAuthenticated: false
            }


        default:
            return state;
    }
}

export default loginReducer;