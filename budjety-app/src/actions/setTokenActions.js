import axios from 'axios';

export const setToken = (token) => {
    if(token){
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        console.log("Authorization is set "+token);
    }else{
        delete axios.defaults.headers.common['Authorization'];
    }
}

export const getAuthorizationHeader = () =>{
    let obj = {
        headers : {
            'Authorization': localStorage.getItem('token')
        }
    }
    console.log(obj);
    return obj; 
}