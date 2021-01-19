function Income(props) {

    return (<div>
        <h4 className="icome__title">
            {
                props.filterType === "filtered" ? "Filtered Results" : ""
            }
        </h4>
        {
            props.incomeDetails.map(income => {
                return (
                    props.source === "dashboard" ? <div className="item clearfix" id={income.iId}>
                        <div className="item__value">{income.iCategory} </div>
                        <div className="item__description">{income.iDescription}</div>
                        <div className="right clearfix">
                            <div className="item__value">+ {income.iValue}</div>
                        </div>
                    </div> :
                        <div className="item clearfix" id={income.iId} onClick={props.deleteIncome.bind(this, income.iId, props.filterType)}>
                            <div className="item__value">{income.iCategory} </div>
                            <div className="item__description">{income.iDescription}</div>
                            <div className="right clearfix">
                                <div className="item__value">+ {income.iValue}</div>
                                <div className="item__delete">
                                    <button className="item__delete--btn">
                                        <i className="ion-ios-close-outline"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                );
            })
        }
    </div>
    );
}

export default Income;