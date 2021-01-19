import { combineReducers } from 'redux';
import expenseReducer from './expenseReducer';
import incomeReducer from './incomeReducer';
import loginReducer from './loginReducer';
import dashboardReducer from './dashboardReducer';
import registerReducer from './registerReducer';
import chartReducer from './chartReducer'
import reportReducer from './reportReducer';

export default combineReducers({

    expense: expenseReducer,
    income: incomeReducer,
    login: loginReducer,
    dashboard: dashboardReducer,
    register: registerReducer,
    chart: chartReducer,
    report: reportReducer

});