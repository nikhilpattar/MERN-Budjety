import Expense from './Expense';
import { connect } from 'react-redux';
import { getExpenses, addExpense, deleteExpense } from '../actions/expenseActions';
import { getCategories, getFilteredResults, resetFilter } from '../actions/dashboardActions';
import { Component } from 'react';
import Navbar from '../othercomponent/Navbar';
import { Redirect } from 'react-router-dom';

class Expenses extends Component {

    expense = {
        uId: this.props.uId,
        eDescription: '',
        eValue: +'',
        eCategory: ''
    }

    filter = {
        uId: this.props.uId,
        month: '',
        year: '',
        type: 'expense',
        category: ''
    }

    setMonth = (value) => this.filter.month = value;
    setYear = (value) => this.filter.year = value;
    setCategory = (value) => this.filter.category = value;

    seteDescription = (value) => this.expense.eDescription = value;
    seteValue = (value) => this.expense.eValue = +value;
    seteCategory = (value) => this.expense.eCategory = value;

    constructor(props) {
        super(props);
        this.props.getExpenses(this.props.uId);
        this.props.getCategories('expense');
        this.props.resetFilter();
        this.state = {
            filtered: 0,
        }
    }

    clearFilter = (e) => {
        e.preventDefault();
        this.props.resetFilter();
        this.setState({ filtered: 1 });
    }

    addExpense = (e) => {
        e.preventDefault();
        this.props.addExpense(this.expense);
    }

    deleteExpense = (expenseId, filterType, e) => {
        e.preventDefault();
        if (filterType === "unfiltered") {
            console.log("unfiltered deleted");
            this.props.deleteExpense(expenseId);
        } else if (filterType === "filtered") {
            console.log("filtered deleted");
            this.props.deleteExpense(expenseId);
            this.props.getFilteredResults(this.filter);
            this.props.getFilteredResults(this.filter);
        }
    }

    filterResults = (e) => {
        e.preventDefault();
        this.props.getFilteredResults(this.filter);
    }

    render() {
        let loading = true;
        if (this.props.expenseList !== null) {
            loading = false;
        }
        let categoryLoad = true;
        if (this.props.eCategory !== null && this.props.eCategory !== undefined) {
            categoryLoad = false;
        }
        let expenseResult = (this.props.filteredExpense === null || this.props.filteredExpense === undefined) ?
            {
                list: this.props.expenseList,
                type: "unfiltered"
            } :
            {
                list: this.props.filteredExpense,
                type: "filtered"
            }
        let expenseList = expenseResult.list;
        let type = expenseResult.type;
        return (
            !this.props.isAuthenticated ? <Redirect to="/login" /> : loading ? <div className="loader" /> : <div className="bottom">
                <Navbar profile={this.props.firstName + ' ' + this.props.lastName} />
                <div className="add">
                    <div className="add__container">
                        <h2 className="expenses__title">Filter Expenses</h2>
                        <select className="add__value red-focus" id="month"
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
                        <input type="number" className="add__value red-focus" placeholder="Year"
                            id="year" onChange={(e) => this.setYear(e.target.value)} />
                        <select className="add__value red-focus" id="eCategory"
                            onChange={(e) => this.setCategory(e.target.value)}>
                            <option value="" disabled selected>Category..</option>
                            {
                                categoryLoad ? <option></option> : this.props.eCategory.map(element => {
                                    return <option value={element}>{element}</option>
                                })
                            }
                        </select>
                        <button className="add__btn red" onClick={this.filterResults}><i className="ion-ios-checkmark-outline"></i></button>
                        <button className="extra_income_btn red" onClick={this.clearFilter}>Clear Filter</button>

                        <h2 className="expenses__title">Add Expenses</h2>
                        <select className="add__value red-focus" id="eCategory"
                            onChange={(e) => this.seteCategory(e.target.value)}>
                            <option value="" disabled selected>Category..</option>
                            {
                                categoryLoad ? <option></option> : this.props.eCategory.map(element => {
                                    return <option value={element}>{element}</option>
                                })
                            }
                        </select>
                        <input type="text" className="add__description red-focus" placeholder="Add description"
                            id="eDescription" onChange={(e) => this.seteDescription(e.target.value)} />
                        <input type="number" className="add__value red-focus" placeholder="Value"
                            id="eValue" onChange={(e) => this.seteValue(e.target.value)} />
                        <button className="add__btn red" onClick={this.addExpense}><i className="ion-ios-checkmark-outline"></i></button>
                    </div>
                </div>

                <div className="container clearfix">
                    <div className="expenses">
                        <div className="expenses__list">
                            {
                                type === "filtered" ?
                                    <Expense key={expenseList.length} expenseDetails={expenseList}
                                        deleteExpense={this.deleteExpense} finalIncome={this.props.incomesSum} filterType={type} /> :
                                    <Expense key={expenseList.length} expenseDetails={expenseList}
                                        deleteExpense={this.deleteExpense} finalIncome={this.props.incomesSum} filterType={type} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => (
    {
        isAuthenticated: state.login.isAuthenticated,
        expenseList: state.expense.expenseList,
        isExpenseAdded: state.expense.isExpenseAdded,
        isExpenseDeleted: state.expense.isExpenseDeleted,
        firstName: state.login.firstName,
        lastName: state.login.lastName,
        eCategory: state.dashboard.expenseCategory,
        uId: state.login.uId,
        incomesSum: state.dashboard.totalIncome,
        filteredExpense: state.dashboard.filteredResults
    }
)

export default connect(mapStateToProps, {
    getExpenses, addExpense, deleteExpense,
    getCategories, getFilteredResults, resetFilter
})(Expenses);
