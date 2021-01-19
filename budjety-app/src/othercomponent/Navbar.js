import '../App.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/loginActions';
import { setValuesToZero } from '../actions/dashboardActions';

function Navbar(props) {

    let clearStorage = (e) => {
        e.preventDefault();
        props.logoutUser();
        props.setValuesToZero();
        localStorage.clear();
    }

    return (
        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <div className="navbar-header">
                    <span className="navbar-brand">Budjety</span>
                </div>
                <ul className="nav navbar-nav">
                    <li className="nav-item"><Link className="nav-link" to="/dashboard">Home</Link></li>
                    <li class="dropdown"><Link class="dropdown-toggle" data-toggle="dropdown">Add <span class="caret"></span></Link>
                        <ul class="dropdown-menu">
                            <li><Link className="nav-link" to="/income">Income</Link></li>
                            <li><Link className="nav-link" to="/expense">Expense</Link></li>
                        </ul>
                    </li>
                    <li><Link className="nav-link" to="/report">Report</Link></li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                    <span className="navbar-brand">Welcome! {props.profile}</span>
                    <li onClick={(e) => clearStorage(e)}><Link to="/login">Logout<span className="glyphicon glyphicon-log-in"></span></Link></li>
                </ul>
            </div>
        </nav>
    );
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, { logoutUser, setValuesToZero })(Navbar);