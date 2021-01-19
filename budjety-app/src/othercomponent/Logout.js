import { Redirect } from 'react-router-dom';

function Logout(props){

    return (
        <Redirect to="/login"/>
    )
}

export default Logout;