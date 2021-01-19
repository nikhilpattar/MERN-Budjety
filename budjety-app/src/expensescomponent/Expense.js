function Expense(props) {

    const income = props.finalIncome;

    let calculatePercentage = (expense) => {
        if (expense > 0) {
            let res = expense / income * 100;
            if (res > 0) {
                return res.toFixed(2);
            }
        } else {
            return 'NA';
        }
    }

    return (
        <div>
            <h4 className="expenses__title">
                {
                    props.filterType === "filtered" ? "Filtered Results" : ""
                }
            </h4>
            {
                props.expenseDetails.map(expense => {
                    return (props.source === "dashboard" ? <div className="item clearfix" id={expense.eId}>
                        <div className="item__value">{expense.eCategory} </div>
                        <div className="item__description">{expense.eDescription}</div>
                        <div className="right clearfix">
                            <div className="item__value">- {expense.eValue}</div>
                            <div className="item__percentage">{calculatePercentage(expense.eValue)}%</div>
                        </div>
                    </div> :
                        <div className="item clearfix" id={expense.eId} onClick={props.deleteExpense.bind(this, expense.eId, props.filterType)}>
                            <div className="item__value">{expense.eCategory} </div>
                            <div className="item__description">{expense.eDescription}</div>
                            <div className="right clearfix">
                                <div className="item__value">- {expense.eValue}</div>
                                <div className="item__percentage">{calculatePercentage(expense.eValue)}%</div>
                                <div className="item__delete">
                                    <button className="item__delete--btn">
                                        <i className="ion-ios-close-outline" />
                                    </button>
                                </div>
                            </div>
                        </div>

                    );
                })}
        </div>
    );
}

export default Expense;