import { useState } from 'react';
import { connect } from 'react-redux';
import { validateUser } from '../actions/loginActions';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

function Login(props) {

    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    const [loginError, setLoginError] = useState('');

    let setValues = (e) => setUser({ ...user, [e.target.name]: e.target.value });

    const { username, password } = user;

    let validate = () => {
        let requiredFields = [user.username, user.password];
        let requiredFieldNames = ["username", "password"];
        let error = '';
        requiredFields.forEach((field, index) => {
            if (field.length <= 0) {
                error += requiredFieldNames[index] + ', '
            }
        })
        return error.slice(0, -2);
    }

    let handleLogin = (e) => {
        e.preventDefault();
        let resError = validate();
        if (resError.length > 0) {
            resError += ' are/is mandatory';
            setLoginError(resError);
        } else {
            props.validateUser(user);
        }
    }

    return (
        props.isAuthenticated ? <Redirect to="/dashboard" /> : <div>
            <div className="sidenav">
                <div className="login-main-text">
                    <h2>BUDJETY</h2>
                </div>
            </div>
            <div className="main">
                <div className="col-md-6 col-sm-12">
                    <div className="login-form">
                        <form>
                            <h3 className="login-display">Login</h3>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Username"
                                    name="username" value={username} onChange={setValues} />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="Password"
                                    name="password" value={password} onChange={setValues} />
                            </div>
                            {
                                loginError.length > 0 ? <p style={{ color: 'red' }}>{loginError}</p> : <div></div>
                            }
                            <button type="submit" className="btn btn-black mr-1" onClick={(e) => handleLogin(e)}>Login</button>
                        </form>
                        <span>Don't have your account?, click on  </span>
                        <Link to="/register">Register</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStatetoProps = state => ({
    isAuthenticated: state.login.isAuthenticated
})

export default connect(mapStatetoProps, { validateUser })(Login);