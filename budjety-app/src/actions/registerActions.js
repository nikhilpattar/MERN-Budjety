import axios from 'axios';

export const addUser = (userDetails) =>
    async (dispatch) => {
        try {
            axios.post('http://localhost:3800/register', userDetails)
                .then(res => {
                    dispatch(
                        {
                            type: "ADD_USER",
                            payload: res.data.uId
                        }
                    )
                })
        } catch (error) {

        }
    }