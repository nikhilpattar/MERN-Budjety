import './App.css';
import IncomeChart from './analysiscomponent/incomecharts';
import ExpenseChart from './analysiscomponent/expensecharts';
import Expenses from './expensescomponent/Expenses';
import Incomes from './incomecomponent/Incomes';
import TableReport from './analysiscomponent/tableReport';
import Login from './logincomponent/Login';
import Logout from './othercomponent/Logout';
import Register from './registercomponent/Register';
import Dashboard from './dashboardcomponent/Dashboard';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Store from './store/Store';

function App() {
  return (
    <Provider store={Store}>
      <Router>
        <Route exact path="/report" component={TableReport} />
        <Route exact path="/incomechart" component={IncomeChart} />
        <Route exact path="/expensechart" component={ExpenseChart} />
        <Route exact path="/" render={() => <Redirect to="/login" />} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/expense" component={Expenses} />
        <Route exact path="/income" component={Incomes} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Router>
    </Provider>
  );
}

export default App;
