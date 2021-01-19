import { useState } from 'react';
import { addUser } from '../actions/registerActions';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Register(props) {

    const [userDetails, setUserDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: ''
    });

    const [registerError, setRegisterError] = useState('')

    let setValues = (e) => setUserDetails({ ...userDetails, [e.target.name]: e.target.value });

    const { firstName, lastName, email, username, password } = userDetails;

    const history = useHistory();

    let validate = () => {
        let requiredFields = [userDetails.firstName, userDetails.lastName, userDetails.email,
        userDetails.username, userDetails.password];
        let requiredFieldNames = ["First Name", "Last Name", "email", "username", "password"];
        let error = '';
        requiredFields.forEach((field, index) => {
            if (field.length <= 0) {
                error += requiredFieldNames[index] + ', '
            }
        })
        return error.slice(0, -2);
    }

    let handleRegister = (e) => {
        e.preventDefault();
        let resError = validate();
        if (resError.length > 0) {
            resError += ' are/is mandatory';
            setRegisterError(resError);
        } else {
            props.addUser(userDetails);
            history.push("/login");
        }
    }

    return (
        <div>
            <div className="sidenav">
                <div className="login-main-text">
                    <h2>BUDJETY</h2>
                </div>
            </div>
            <div className="main">
                <div className="col-md-6 col-sm-12">
                    <div className="login-form">
                        <form>
                            <h3 className="login-display">Register</h3>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="First Name"
                                    name="firstName" value={firstName} onChange={setValues} />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Last Name"
                                    name="lastName" value={lastName} onChange={setValues} />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Email"
                                    name="email" value={email} onChange={setValues} />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="username"
                                    name="username" value={username} onChange={setValues} />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="password, atleast 5 characters"
                                    name="password" value={password} onChange={setValues} />
                            </div>
                            {
                                registerError.length > 0 ? <p style={{ color: 'red' }}>{registerError}</p> : <div></div>
                            }
                            <button type="submit" className="btn btn-black" onClick={(e) => handleRegister(e)}>Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => (
    {
        isRegistered: state.register.isRegistered
    }
)

export default connect(mapStateToProps, { addUser })(Register);