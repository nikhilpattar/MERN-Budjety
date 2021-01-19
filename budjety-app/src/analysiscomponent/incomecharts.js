import { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../othercomponent/Navbar';
import { Redirect } from 'react-router-dom';
import { CanvasJSChart } from 'canvasjs-react-charts';

class IncomeChart extends Component {

    constructor(props) {
        super(props);
        this.incomePieChart = {
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
                    { y: 0, label: "Salary" },
                    { y: 0, label: "House/Rent" },
                    { y: 0, label: "Business/Profession" },
                    { y: 0, label: "Others" }
                ]
            }]
        }

        this.incomeBarChart = {
            animationEnabled: true,
            theme: "light1", // "light1", "light2", "dark1", "dark2"
            title: {
                text: ""
            },
            axisY: {
                title: "Income Amount"
            },
            data: [{
                type: "column",
                showInLegend: true,
                legendMarkerColor: "grey",
                legendText: "Income Category",
                dataPoints: [
                    { y: 0, label: "Salary" },
                    { y: 0, label: "House/Rent" },
                    { y: 0, label: "Business/Profession" },
                    { y: 0, label: "Others" }
                ]
            }]
        }
        this.setData(this.props.incomeChartResults);
    }

    setData = (results) => {
        let sum = this.evaluateIncome(results);
        this.incomePieChart.data[0].dataPoints.forEach((element, index) => {
            element.y = this.fixDecimal(sum.total, sum.sub[index]);
        });
        this.incomeBarChart.data[0].dataPoints.forEach((element, index) => {
            element.y = sum.sub[index];
        });
    }

    evaluateIncome = (results) => {
        let sum = {
            total: 0,
            sub: [0, 0, 0, 0]
        }

        results.forEach(element => {
            if (element.iCategory === "Salary") {
                sum.sub[0] += element.iValue;
            }
            else if (element.iCategory === "House/Rent") {
                sum.sub[1] += element.iValue;
            }
            else if (element.iCategory === "Business/Profession") {
                sum.sub[2] += element.iValue;
            }
            else if (element.iCategory === "Others") {
                sum.sub[3] += element.iValue;
            }
            sum.total += element.iValue;
        });

        return sum;
    }

    fixDecimal = (total, subIncome) => {
        if (subIncome > 0)
            return +((subIncome / total) * 100).toFixed(2);
        else
            return 0;
    }

    render() {
        let chartLoading = true;
        let month, year;
        if (this.props.incomeChartResults !== null && this.props.incomeChartResults !== undefined) {
            chartLoading = false;
            month = this.props.incomeChartResults[0].iMonth;
            year = this.props.incomeChartResults[0].iYear;
        }
        return (
            !this.props.isAuthenticated ? <Redirect to="/login" /> : <div>
                <Navbar profile={this.props.firstName + ' ' + this.props.lastName} />
                {
                    chartLoading ? <div className="budget__title">No charts filtered....</div> :
                        <div className="add__container">
                            <h2 className="icome__title">Income Analysis for month:
                        {
                                    '  ' + month + ', ' + year
                                }
                            </h2>
                            <CanvasJSChart options={this.incomePieChart} />
                            <CanvasJSChart options={this.incomeBarChart} />
                        </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.login.isAuthenticated,
    firstName: state.login.firstName,
    lastName: state.login.lastName,
    uId: state.login.uId,
    incomeChartResults: state.dashboard.chartMonthlyResults
})

export default connect(mapStateToProps, {})(IncomeChart); 