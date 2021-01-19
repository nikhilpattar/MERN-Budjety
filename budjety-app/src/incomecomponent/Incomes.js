import { connect } from 'react-redux';
import { getIncomes, addIncome, deleteIncome } from '../actions/incomeActions';
import { getCategories, getFilteredResults, resetFilter } from '../actions/dashboardActions';
import { Component } from 'react';
import Income from './Income';
import Navbar from '../othercomponent/Navbar';
import { Redirect } from 'react-router-dom';

class Incomes extends Component {

    income = {
        uId: this.props.uId,
        iDescription: '',
        iValue: +'',
        iCategory: ''
    }

    filter = {
        uId: this.props.uId,
        month: '',
        year: '',
        type: 'income',
        category: ''
    }

    setMonth = (value) => this.filter.month = value;
    setYear = (value) => this.filter.year = value;
    setCategory = (value) => this.filter.category = value;

    setiDescription = (value) => this.income.iDescription = value;
    setiValue = (value) => this.income.iValue = +value;
    setiCategory = (value) => this.income.iCategory = value;

    constructor(props) {
        super(props);
        this.props.getIncomes(this.props.uId);
        this.props.getCategories('income');
        this.props.resetFilter();
        this.state = {
            filtered: true,
        }
    }

    clearFilter = (e) => {
        e.preventDefault();
        this.props.resetFilter();
        this.setState({ filtered: false });
    }

    addIncome = (e) => {
        e.preventDefault();
        this.props.addIncome(this.income);
    }

    deleteIncome = (incomeId, filterType, e) => {
        e.preventDefault();
        if (filterType === "unfiltered") {
            this.props.deleteIncome(incomeId);
        } else if (filterType === "filtered") {
            this.props.deleteIncome(incomeId);
            this.props.getFilteredResults(this.filter);
        }
    }

    filterResults = (e) => {
        e.preventDefault();
        this.props.getFilteredResults(this.filter);
    }

    render() {
        let loading = true;
        if (this.props.incomeList !== null) {
            loading = false;
        }
        let categoryLoad = true;
        if (this.props.iCategory !== null && this.props.iCategory !== undefined) {
            categoryLoad = false;
        }
        let incomeResult = (this.props.filteredIncome === null || this.props.filteredIncome === undefined) ?
            {
                list: this.props.incomeList,
                type: "unfiltered"
            } :
            {
                list: this.props.filteredIncome,
                type: "filtered"
            }
        let incomeList = incomeResult.list;
        let type = incomeResult.type;
        return (
            !this.props.isAuthenticated ? <Redirect to="/login" /> : loading ? <div className="loader" /> : <div className="bottom">
                <Navbar profile={this.props.firstName + ' ' + this.props.lastName} />
                <div className="add">
                    <div className="add__container">
                        <h2 className="icome__title">Filter Income</h2>
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
                        <select className="add__value" id="iCategory"
                            onChange={(e) => this.setCategory(e.target.value)}>
                            <option value="" disabled selected>Category..</option>
                            {
                                categoryLoad ? <option></option> : this.props.iCategory.map(element => {
                                    return <option value={element}>{element}</option>
                                })
                            }
                        </select>
                        <button className="add__btn" onClick={this.filterResults}><i className="ion-ios-checkmark-outline"></i></button>
                        <button className="extra_income_btn" onClick={this.clearFilter}>Clear Filter</button>
                        <h2 className="icome__title">Add Income</h2>
                        <select className="add__value" id="iCategory"
                            onChange={(e) => this.setiCategory(e.target.value)}>
                            <option value="" disabled selected>Category..</option>
                            {
                                categoryLoad ? <option></option> : this.props.iCategory.map(element => {
                                    return <option value={element}>{element}</option>
                                })
                            }
                        </select>
                        <input type="text" className="add__description" placeholder="Add description"
                            id="iDescription" onChange={(e) => this.setiDescription(e.target.value)} />
                        <input type="number" className="add__value" placeholder="Value"
                            id="iValue" onChange={(e) => this.setiValue(e.target.value)} />
                        <button className="add__btn" onClick={this.addIncome}><i className="ion-ios-checkmark-outline"></i></button>
                    </div>
                </div>

                <div className="container clearfix">
                    <div className="income">
                        <div className="income__list">
                            {
                                type === "filtered" ?
                                    <Income key={incomeList.length} incomeDetails={incomeList}
                                        deleteIncome={this.deleteIncome} filterType={type} /> :
                                    <Income key={incomeList.length} incomeDetails={incomeList}
                                        deleteIncome={this.deleteIncome} filterType={type} />
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
        incomeList: state.income.incomeList,
        isIncomeAdded: state.income.isIncomeAdded,
        isIncomeDeleted: state.income.isIncomeDeleted,
        firstName: state.login.firstName,
        lastName: state.login.lastName,
        iCategory: state.dashboard.incomeCategory,
        uId: state.login.uId,
        filteredIncome: state.dashboard.filteredResults
    }
)

export default connect(mapStateToProps, {
    getIncomes, addIncome, deleteIncome,
    getCategories, getFilteredResults, resetFilter
})(Incomes);
