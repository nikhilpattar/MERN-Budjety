import axios from 'axios';

export const getReport = (filter) =>
    async (dispatch) => {
        try {
            console.log(filter);
            await axios.post(`http://localhost:3800/report/${filter.uId}`, filter)
                .then(res => {
                    dispatch(
                        {
                            type: "GET_REPORT",
                            payload: res.data.yearResult
                        }
                    )
                })
        } catch (error) {

        }
    }