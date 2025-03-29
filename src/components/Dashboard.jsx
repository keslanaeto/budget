import React, {useState, useEffect}from 'react'
import { useNavigate } from 'react-router-dom';
import "../styles/Dashboard.css"


const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState("Food & Beverage");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  
  const navigate = useNavigate();

   const storedUser = JSON.parse(localStorage.getItem("user"));
   const username = storedUser ? storedUser.nickname : "User";
 
   useEffect(() => {
     const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
     setExpenses(storedExpenses);
   }, []);
 
   useEffect(() => {
     localStorage.setItem("expenses", JSON.stringify(expenses));
   }, [expenses]);

  const handleAddExpense = () => {
    if (!amount || !date || !category) {
      alert("Please fill in all fields!");
      return;
    }

    const newExpense = {
      id: Date.now(),
      category,
      amount: parseFloat(amount),
      date,
    };

    setExpenses([...expenses, newExpense]);

   
    setCategory("Food & Beverage");
    setAmount("");
    setDate("");
  };

  const handleDeleteExpense = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
  };

  const calculateTotal = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0).toFixed(2);
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); 
    navigate("/login"); 
  };

  return (
    <div className="dashboard-container">
      <div className='dashboard-header'>
      <h1>Hi Kesla, Welcome!</h1>
      <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      

      <div className="input-section">
        <label htmlFor="category-select">Category:</label>
        <select
          id="category-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Food & Beverage">Food & Beverage</option>
          <option value="Rent">Rent</option>
          <option value="Transportation">Transportation</option>
          <option value="Internet">Internet</option>
          <option value="Gadgets">Gadgets</option>
          <option value="Kitchen">Kitchen</option>
          <option value="Drinks">Club</option>
          <option value="Drinks">Drinks</option>
          <option value="Shopping">Shopping</option>
        </select>

        <label htmlFor="amount-input">Amount:</label>
        <input
          type="number"
          id="amount-input"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <label htmlFor="date-input">Date:</label>
        <input
          type="date"
          id="date-input"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button id="add-btn" onClick={handleAddExpense}>
          Add
        </button>
      </div>

      <div className="expenses-list">
        <h2>Expenses List</h2>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.category}</td>
                <td>${expense.amount.toFixed(2)}</td>
                <td>{expense.date}</td>
                <td>
                  <button onClick={() => handleDeleteExpense(expense.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Total:</td>
              <td>${calculateTotal()}</td>
              <td></td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;