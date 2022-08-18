import ExpenseForm from "./ExpenseForm";
import { useState } from "react";
import "./NewExpense.css";
const NewExpense = (props) => {
  const [clicked, setClick] = useState(false);
  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
    };

    props.onAddExpense(expenseData);
  };
  const showFormHandler = () => setClick(true);
  const hideFormHandler = () => setClick(false);
  return (
    <div className="new-expense">
      {!clicked && <button onClick={showFormHandler}>Add New Expense</button>}
      {clicked && (
        <ExpenseForm
          onCancel={hideFormHandler}
          onSaveExpenseData={saveExpenseDataHandler}
        />
      )}
    </div>
  );
};

export default NewExpense;
