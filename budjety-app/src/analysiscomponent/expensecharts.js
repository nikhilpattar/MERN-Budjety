import { Component } from 'react';
import { CanvasJSChart } from 'canvasjs-react-charts';
import { connect } from 'react-redux';
import Navbar from '../othercomponent/Navbar';
import { Redirect } from 'react-router-dom';

class ExpenseChart extends Component {

    constructor(props) {
        super(props);
        this.expensePieChart = {
            theme: "light1", // "light1", "light2", "dark1", "dark2"
            exportEnabled: true,
            animationEnabled: true,
            title: {
                text: ""
            },
            data: [{
                type: "pie",
                startAngle: 25,
                toolTipContent: "<b>{label}</b>: {y}%",
                showInLegend: "true",
                legendText: "{label}",
                indexLabelFontSize: 16,
                indexLabel: "{label} - {y}%",
                dataPoints: [
                    { y: 0, label: "Travel" },
                    { y: 0, label: "Electric Bill" },
                    { y: 0, label: "Water Bill" },
                    { y: 0, label: "Insurance" },
                    { y: 0, label: "Groceries" },
                    { y: 0, label: "Gadgets" },
                    { y: 0, label: "Maintainance" },
                    { y: 0, label: "Repairs" },
                    { y: 0, label: "Others" }
                ]
            }]
        }

        this.expenseBarChart = {
            animationEnabled: true,
            theme: "light2", // "light1", "light2", "dark1", "dark2"
            title: {
                text: ""
            },
            axisY: {
                title: "Expense Amount"
            },
            data: [{
                type: "column",
                showInLegend: true,
                legendMarkerColor: "grey",
                legendText: "expense Category",
                dataPoints: [
                    { y: 0, label: "Travel" },
                    { y: 0, label: "Electric Bill" },
                    { y: 0, label: "Water Bill" },
                    { y: 0, label: "Insurance" },
                    { y: 0, label: "Groceries" },
                    { y: 0, label: "Gadgets" },
                    { y: 0, label: "Maintainance" },
                    { y: 0, label: "Repairs" },
                    { y: 0, label: "Others" }
                ]
            }]
        }
        this.setData(this.props.expenseChartResults);
    }

    setData = (results) => {
        let sum = this.evaluateExpense(results);
        this.expensePieChart.data[0].dataPoints.forEach((element, index) => {
            element.y = this.fixDecimal(sum.total, sum.sub[index]);
        })
        this.expenseBarChart.data[0].dataPoints.forEach((element, index) => {
            element.y = sum.sub[index];
        })
    }

    evaluateExpense = (results) => {
        let sum = {
            total: 0,
            sub: [0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
        results.forEach(element => {
            if (element.eCategory === "Travel") {
                sum.sub[0] += element.eValue;
            } else if (element.eCategory === "Electric Bill") {
                sum.sub[1] += element.eValue;
            } else if (element.eCategory === "Water Bill") {
                sum.sub[2] += element.eValue;
            } else if (element.eCategory === "Insurance") {
                sum.sub[3] += element.eValue;
            } else if (element.eCategory === "Groceries") {
                sum.sub[4] += element.eValue;
            } else if (element.eCategory === "Gadgets") {
                sum.sub[5] += element.eValue;
            } else if (element.eCategory === "Maintainance") {
                sum.sub[6] += element.eValue;
            } else if (element.eCategory === "Repairs") {
                sum.sub[7] += element.eValue;
            } else if (element.eCategory === "Others") {
                sum.sub[8] += element.eValue;
            }
            sum.total += element.eValue;
        });

        return sum;
    }

    fixDecimal = (total, subExpense) => {
        if (subExpense > 0)
            return +((subExpense / total) * 100).toFixed(2);
        else
            return 0;
    }

    render() {
        let chartLoading = true;
        let month, year;
        if (this.props.expenseChartResults !== null && this.props.expenseChartResults !== undefined) {
            chartLoading = false;
            month = this.props.expenseChartResults[0].eMonth;
            year = this.props.expenseChartResults[0].eYear;
        }
        return (
            !this.props.isAuthenticated ? <Redirect to="/login" /> : <div>
                <Navbar profile={this.props.firstName + ' ' + this.props.lastName} />
                {
                    chartLoading ? <div className="budget__title">No charts filtered....</div> :
                        <div className="add__container">
                            <h2 className="expenses__title">Expense Analysis for month:
                        {
                                    '  ' + month + ', ' + year
                                }
                            </h2>
                            <CanvasJSChart options={this.expensePieChart} />
                            <CanvasJSChart options={this.expenseBarChart} />
                        </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.login.isAuthenticated,
    firstName: state.login.firstName,
    uId: state.login.uId,
    lastName: state.login.lastName,
    expenseChartResults: state.dashboard.chartMonthlyResults
})

export default connect(mapStateToProps, {})(ExpenseChart); 