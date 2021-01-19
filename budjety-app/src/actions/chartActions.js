import axios from 'axios';

export const getChartResults = (filter) =>
    async (dispatch) =>{
        try {
            await axios.post(`http://localhost:3800/${filter.type}/chart/${filter.uId}`, filter)
            .then(res =>{
                dispatch({
                    type: "GET_CHART_RESULTS",
                    payload: res.data.chartResults
                })
            })
        } catch (error) {
            console.log(error);
        }
    }