import axios from 'axios';

export const validateUser = (user) =>
    async (dispatch) => {
        try {
            await axios.post('http://localhost:3800/login', user)
                .then(res => {
                    dispatch(
                        {
                            type: "VALIDATE_USER",
                            payload: res.data.token,
                            firstName: res.data.firstName,
                            lastName: res.data.lastName,
                            uId: res.data.uId
                        }
                    )
                })
        } catch (error) {
            console.log(error);
        }
    }

export const logoutUser = () =>
    async (dispatch) => {
        try {
            dispatch(
                {
                    type: "LOGOUT_USER"
                }
            )
        } catch (error) {
            console.log(error);
        }
    }

