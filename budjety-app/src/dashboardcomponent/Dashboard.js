import { Component } from 'react';
import { connect } from 'react-redux';
import { sumOfExpenses, sumOfIncomes, getCategories, getFilteredResults, resetFilter } from '../actions/dashboardActions';
import Navbar from '../othercomponent/Navbar';
import Income from '../incomecomponent/Income';
import Expense from '../expensescomponent/Expense';
import { Redirect } from 'react-router-dom';
import { deleteIncome } from '../actions/incomeActions';
import { deleteExpense } from '../actions/expenseActions';
import { Link } from 'react-router-dom';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.props.sumOfExpenses(this.props.uId);
        this.props.sumOfIncomes(this.props.uId);
        this.props.resetFilter();
        this.state = {
            chartType: '',
        }
    }

    filter = {
        uId: this.props.uId,
        month: '',
        year: '',
        type: '',
        category: ''
    }

    setMonth = (value) => this.filter.month = value;
    setYear = (value) => this.filter.year = value;
    setCategory = (value) => this.filter.category = value;

    displayFiltered = (e) => {
        e.preventDefault();
        this.props.getFilteredResults(this.filter);
        this.setState({ chartType: this.filter.type });
    }

    displayCategories = (e, value) => {
        e.preventDefault();
        this.filter.type = value;
        this.props.getCategories(value);
    }

    finalBudjet = (income, expense) => {
        let n = 0;
        if (income > expense) {
            n = income - expense;
            return `+ ${n.toLocaleString()}`;
        } else {
            n = expense - income;
            return `- ${n.toLocaleString()}`;
        }
    }

    displayDate = () => {
        let now, months;
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
            'September', 'October', 'November', 'December'];
        now = new Date();

        return months[now.getMonth()] + ', ' + now.getFullYear();
    }

    calculatePercentage = (income, expense) => {
        if (expense > 0) {
            return `${(expense / income * 100).toFixed(2)} %`;
        } else {
            return `NA`;
        }
    }

    render() {
        let loading = true;
        let categoryLoad = true;
        let filterLoad = true;
        if (this.props.sumOfIncomes !== null && this.props.sumOfExpenses !== null) {
            loading = false;
        }
        if (this.props.filterdResults !== null && this.props.filterdResults !== undefined) {
            filterLoad = false;
        }
        if ((this.props.iCategory !== null && this.props.iCategory !== undefined) ||
            (this.props.eCategory !== null && this.props.eCategory !== undefined)) {
            categoryLoad = false;
        }
        return (
            !this.props.isAuthenticated ? <Redirect to="/login" /> : loading ? <div className="loader" /> : <div >
                <Navbar profile={this.props.firstName + ' ' + this.props.lastName} />
                <div className="budget">
                    <div className="budget__title">
                        Available Budget in <span className="budget__title--month">{this.displayDate()}</span>:
                </div>
                    <div className="budget__value">
                        {
                            this.finalBudjet(this.props.incomesSum, this.props.expensesSum)
                        }
                    </div>

                    <div className="budget__income clearfix">
                        <div className="budget__income--text">Income</div>
                        <div className="right">
                            <div className="budget__income--value">+
                                {this.props.incomesSum.toLocaleString()}
                            </div>
                            <div className="budget__income--percentage">&nbsp;</div>
                        </div>
                    </div>

                    <div className="budget__expenses clearfix">
                        <div className="budget__expenses--text">Expenses</div>
                        <div className="right clearfix">
                            <div className="budget__expenses--value">-
                                {this.props.expensesSum.toLocaleString()}
                            </div>
                            <div className="budget__expenses--percentage">
                                {
                                    this.calculatePercentage(this.props.incomesSum, this.props.expensesSum)
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="add">
                    <div className="add__container">
                        <h2 className="icome__title">Income/ Expense Analysis</h2>
                        <select className="add__value" id="month"
                            onChange={(e) => this.setMonth(e.target.value)}>
                            <option value="" disabled selected>Month..</option>
                            <option value="January">January</option>
                            <option value="February">February</option>
                            <option value="March">March</option>
                            <option value="April">April</option>
                            <option value="May">May</option>
                            <option value="June">June</option>
                            <option value="July">July</option>
                            <option value="August">Augut</option>
                            <option value="September">September</option>
                            <option value="October">October</option>
                            <option value="November">November</option>
                            <option value="December">December</option>
                        </select>
                        <input type="number" className="add__value" placeholder="Year"
                            id="year" onChange={(e) => this.setYear(e.target.value)} />
                        <select className="add__value" id="type"
                            onChange={(e) => this.displayCategories(e, e.target.value)}>
                            <option value="" disabled selected>Type..</option>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                        <select className="add__value" id="typeCategory"
                            onChange={(e) => this.setCategory(e.target.value)}>
                            <option value="" disabled selected>Category..</option>
                            {
                                categoryLoad ? <option></option> : this.props.iCategory !== null && this.props.eCategory === null ? this.props.iCategory.map(element => {
                                    return <option value={element}>{element}</option>
                                }) : this.props.eCategory.map(element => {
                                    return <option value={element}>{element}</option>
                                })
                            }
                        </select>
                        <button className="add__btn" onClick={(e) => this.displayFiltered(e)}><i className="ion-ios-checkmark-outline"></i></button>
                        <div className="add__container">
                            {
                                this.state.chartType === "" ? <div></div> : (this.props.filterdResults === undefined
                                    || this.props.filterdResults === null
                                    || this.props.filterdResults.length <= 0) ?
                                    <div>No results available....</div> : this.state.chartType === "income" ?
                                        <Link className="icome__title" to="/incomechart">Income Analysis</Link> :
                                        <Link className="expenses__title" to="/expensechart"> Expense Analysis</Link>
                            }
                        </div>
                    </div>
                </div>

                <div className="container clearfix">
                    {
                        filterLoad ? <div className="budget__title">No results filtered....</div> : this.filter.type === "income" ? <div className="income">
                            <div className="income__list">
                                {
                                    <Income key={this.props.filterdResults.length} incomeDetails={this.props.filterdResults}
                                        source={"dashboard"} />
                                }
                            </div>
                        </div>
                            : <div className="expenses">
                                <div className="expenses__list">
                                    {
                                        <Expense key={this.props.filterdResults.length} expenseDetails={this.props.filterdResults}
                                            source={"dashboard"} />
                                    }
                                </div>
                            </div>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({

    isAuthenticated: state.login.isAuthenticated,
    incomesSum: state.dashboard.totalIncome,
    expensesSum: state.dashboard.totalExpense,
    firstName: state.login.firstName,
    lastName: state.login.lastName,
    uId: state.login.uId,
    iCategory: state.dashboard.incomeCategory,
    eCategory: state.dashboard.expenseCategory,
    filterdResults: state.dashboard.filteredResults,
    chartResults: state.dashboard.chartMonthlyResults
})

export default connect(mapStateToProps, {
    sumOfExpenses, sumOfIncomes, getCategories,
    deleteExpense, deleteIncome, getFilteredResults, resetFilter
})(Dashboard);