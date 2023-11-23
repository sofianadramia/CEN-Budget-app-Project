import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

const Transactions = ({ transactions, createTx }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tx, setTx] = useState({});

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      {
        isEditing ? 
          <div>
            <h4>Add Transaction</h4>
            <input type="text" placeholder="Name" onChange={(e) => setTx({
              ...tx,
              name: e.target.value,
            })} />
            <input type="text" placeholder="Amount" onChange={(e) => setTx({
              ...tx,
              amount: e.target.value,
            })}/>
            <select onChange={(e) => setTx({
              ...tx,
              category: e.target.value,
            })} value="default">
              <option value="default">Select a category...</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Food">Food</option>
            </select>
            <button onClick={() => {
              console.log(tx);
              setIsEditing(false);
              createTx(tx);
            }}>Create</button>
          </div>
          : null
      }

      <h2>Transactions</h2>
      <div>
        <button style={{ fontSize: '0.7rem' }} onClick={() => setIsEditing(true)}>Add New Transaction</button>
      </div>
      {transactions.length === 0 ? <tr>
        <td>
          No transactions exist
        </td>
      </tr>: 
    <table style={{ marginTop: '2rem', border: '1px solid #666', borderRadius: '6px', width: '100%'}}>
      <thead>
        <tr>
          <th style={{ paddingBottom: '0.3rem'}}>Name</th>
          <th style={{ paddingBottom: '0.3rem'}}>Amount</th>
          <th style={{ paddingBottom: '0.3rem'}}>Category</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((tx) => {
          return (
            <Transaction
              name={tx.name}
              category={tx.category}
              amount={tx.amount}
            />
          );
        })}
      </tbody>
    </table> }
    </div>
  );
};

const Transaction = ({ name, category, amount }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>${amount}</td>
      <td>{category}</td>
    </tr>
  );
};

function App() {
  const [transactions, setTransactions] = useState([]);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Transactions
        transactions={transactions}
        createTx={(tx) => {
          setTransactions([
            ...transactions,
            tx,
          ]);
        }}
      />
      </div>
    </>
  );
}

export default App;
