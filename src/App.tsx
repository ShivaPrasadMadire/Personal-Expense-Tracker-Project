import "./styles.css";
import React, { useState, useEffect } from "react";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses"));
    if (storedExpenses) {
      setExpenses(storedExpenses);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const handleAddExpense = () => {
    if (!description || !amount || !date) {
      alert("Please fill out all fields");
      return;
    }

    const newExpense = { description, amount, date };
    if (editIndex !== null) {
      const updatedExpenses = expenses.map((expense, index) =>
        index === editIndex ? newExpense : expense
      );
      setExpenses(updatedExpenses);
      setEditIndex(null);
    } else {
      setExpenses([...expenses, newExpense]);
    }

    setDescription("");
    setAmount("");
    setDate("");
  };

  const handleEditExpense = (index) => {
    const expense = expenses[index];
    setDescription(expense.description);
    setAmount(expense.amount);
    setDate(expense.date);
    setEditIndex(index);
  };

  const handleDeleteExpense = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
  };

  return (
    <div className="App">
      <h1>Personal Expense Tracker</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={handleAddExpense}>
          {editIndex !== null ? "Update Expense" : "Add Expense"}
        </button>
      </div>
      <div className="expense-list">
        {expenses
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((expense, index) => (
            <div key={index} className="expense-item">
              <span>{expense.description}</span>
              <span>{expense.amount}</span>
              <span>{expense.date}</span>
              <button onClick={() => handleEditExpense(index)}>Edit</button>
              <button onClick={() => handleDeleteExpense(index)}>Delete</button>
            </div>
          ))}
      </div>
      <div className="total">
        Total:{" "}
        {expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0)}
      </div>
    </div>
  );
}

export default App;
