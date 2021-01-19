import Navbar from '../othercomponent/Navbar';
import { connect } from 'react-redux';
import { Component } from 'react';
import { getReport } from '../actions/reportActions';

class TableReport extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filter: {
                year: (new Date()).getFullYear(),
                uId: this.props.uId
            }
        }
        this.props.getReport(this.state.filter);
    }
    filterUpdated = {
        year: '',
        uId: this.props.uId
    }

    setYear = (value) => this.filterUpdated.year = value;

    change = (e) => {
        e.preventDefault();
        this.props.getReport(this.filterUpdated);
        this.setState({
            filter: this.filterUpdated
        })
    }

    render() {
        let reportLoading = true;
        let report
        if (this.props.reportResults !== null && this.props.reportResults !== undefined) {
            report = this.props.reportResults;
            reportLoading = false;
        }
        return (
            reportLoading ? <div className="loader" /> : <div>
                <Navbar profile={this.props.firstName + ' ' + this.props.lastName} />
                {
                    <div className="add__container">
                        <h2 className="icome__title">Filter Annual Report</h2>
                        <input type="number" className="add__value" placeholder="Year"
                            id="year" onChange={(e) => this.setYear(e.target.value)} />
                        <button className="add__btn" onClick={(e) => this.change(e)}><i className="ion-ios-checkmark-outline"></i></button>
                        <h2 className="icome__title">Annual Report of {this.state.filter.year}</h2>
                        <table>
                            <tr>
                                <th>Details</th>
                                <th>Amount</th>
                            </tr>
                            <tr>
                                <th colSpan="2"> Income Categories</th>
                            </tr>
                            <tr>
                                <td>Salary</td>
                                <td>+{report.salary}</td>
                            </tr>
                            <tr>
                                <td>House/Rent</td>
                                <td>+{report.house}</td>
                            </tr>
                            <tr>
                                <td>Business/Profession</td>
                                <td>+{report.business}</td>
                            </tr>
                            <tr>
                                <td>Others</td>
                                <td>+{report.othersIncome}</td>
                            </tr>
                            <tr>
                                <th colSpan="2">Expense Categories</th>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Travel</td>
                                <td>-{report.travel}</td>
                            </tr>
                            <tr>
                                <td>Electric Bill</td>
                                <td>-{report.electric}</td>
                            </tr>
                            <tr>
                                <td>Water Bill</td>
                                <td>-{report.water}</td>
                            </tr>
                            <tr>
                                <td>Insurance</td>
                                <td>-{report.insurance}</td>
                            </tr>
                            <tr>
                                <td>Groceries</td>
                                <td>-{report.groceries}</td>
                            </tr>
                            <tr>
                                <td>Gadgets</td>
                                <td>-{report.gadgets}</td>
                            </tr>
                            <tr>
                                <td>Maintainance</td>
                                <td>-{report.maintainance}</td>
                            </tr>
                            <tr>
                                <td>Repairs</td>
                                <td>-{report.repairs}</td>
                            </tr>
                            <tr>
                                <td>Others</td>
                                <td>-{report.othersExpense}</td>
                            </tr>
                            <tr>
                                <th>Total Income</th>
                                <td>+{report.totalIncome}</td>
                            </tr>
                            <tr>
                                <th>Total Expense</th>
                                <td>-{report.totalExpense}</td>
                            </tr>
                        </table>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => (
    {
        isAuthenticated: state.login.isAuthenticated,
        firstName: state.login.firstName,
        lastName: state.login.lastName,
        uId: state.login.uId,
        reportResults: state.report.yearlyReport,
    }
)

export default connect(mapStateToProps, { getReport })(TableReport);
