import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { categories, makeBudgets } from "./categories";
import "./App.css";
import { Box } from "@mui/system";
import { Header } from "./Header";
import { Container } from "./Container";
import { BudgetDashboard } from "./BudgetDashboard";
import {
  Typography,
  LinearProgress,
  Alert,
  Chip,
  Sheet,
  Table,
} from "@mui/joy";
import { useLocalStorage } from "./useLocalStorage";
import { Link } from "react-router-dom";

const Transactions = ({ transactions, createTx }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tx, setTx] = useState({});

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isEditing ? (
        <div>
          <h4>Add Transaction</h4>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) =>
              setTx({
                ...tx,
                name: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Amount"
            onChange={(e) =>
              setTx({
                ...tx,
                amount: e.target.value,
              })
            }
          />
          <select
            onChange={(e) =>
              setTx({
                ...tx,
                category: e.target.value,
              })
            }
            value="default"
          >
            <option value="default">Select a category...</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Food">Food</option>
          </select>
          <button
            onClick={() => {
              console.log(tx);
              setIsEditing(false);
              createTx(tx);
            }}
          >
            Create
          </button>
        </div>
      ) : null}

      <h2>Transactions</h2>
      <div>
        <button
          style={{ fontSize: "0.7rem" }}
          onClick={() => setIsEditing(true)}
        >
          Add New Transaction
        </button>
      </div>
      {transactions.length === 0 ? (
        <tr>
          <td>No transactions exist</td>
        </tr>
      ) : (
        <table
          style={{
            marginTop: "2rem",
            border: "1px solid #666",
            borderRadius: "6px",
            width: "100%",
          }}
        >
          <thead>
            <tr>
              <th style={{ paddingBottom: "0.3rem" }}>Name</th>
              <th style={{ paddingBottom: "0.3rem" }}>Amount</th>
              <th style={{ paddingBottom: "0.3rem" }}>Category</th>
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
        </table>
      )}
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
  const [budgets, setBudgets] = useLocalStorage("budgets", makeBudgets());
  const [txs, setTxs] = useLocalStorage("txs", []);

  let total = 0;
  txs.forEach((tx) => {
    total += tx.amount;
  });

  let calculated = {};
  budgets.forEach((budget) => {
    let categoryTotal = 0;
    let grouped = {};

    txs
      .filter((tx) => tx.category === budget.name)
      .forEach((tx) => {
        categoryTotal += tx.amount;
        if (!grouped[tx.name]) {
          grouped[tx.name] = 0;
        }

        grouped[tx.name] += tx.amount;
      });

    let perc =
      categoryTotal === 0
        ? 0
        : Math.round((categoryTotal / budget.amount) * 100);

    if (perc > 100) {
      perc = 100;
    }

    calculated[budget.name] = {
      percentage: perc,
      amount: Math.round(budget.amount - categoryTotal),
      txByName: grouped,
    };
  });

  return (
    <Box>
      <Header />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Container>
          <Box
            display="flex"
            flexDirection="column"
            width="500px"
            sx={{ margin: "1rem auto" }}
          >
            <Box>
              <Typography level="h1">Dashboard</Typography>
            </Box>
            {budgets.length === 0 ? (
              <Box sx={{ width: "500px", marginTop: "1rem" }}>
                <Alert color="warning">
                  You need to create a budget first!
                  <Link to="/budget">Let's go!</Link>
                </Alert>
              </Box>
            ) : (
              categories.map((category) => {
                const budget = budgets.find(
                  (budget) => budget.name === category
                );

                return (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      alignItems: "center",
                      marginTop: "1rem",
                    }}
                  >
                    <Box sx={{ marginRight: "1rem", fontWeight: "500" }}>
                      <Chip>{category}</Chip> ${calculated[category].amount}
                    </Box>
                    <Box
                      sx={{
                        width: "100%",
                        marginLeft: "auto",
                        marginRight: "-20px",
                        width: "200px",
                      }}
                    >
                      <LinearProgress
                        determinate
                        value={calculated[category].percentage}
                        color={
                          calculated[category].amount < 0 ? "danger" : "success"
                        }
                      />
                    </Box>
                  </Box>
                );
              })
            )}
          </Box>

          <Box sx={{ width: "500px", margin: "1rem auto" }}>
            <Typography level="h2">Top Transactions</Typography>
            <Sheet>
              <Table
                borderAxis="xBetween"
                color="neutral"
                stickyFooter
                stickyHeader
                variant="plain"
              >
                <thead>
                  <tr>
                    <th style={{ width: "40%" }}>Name</th>
                    <th>Amount</th>
                    <th>Category</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(calculated).map((category) =>
                    Object.keys(calculated[category].txByName).map((txName) => {
                      const amount = calculated[category].txByName[txName];
                      return (
                        <tr key={txName}>
                          <td>{txName}</td>
                          <td>${amount}</td>
                          <td>
                            <Chip color="primary">{category}</Chip>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </Table>
            </Sheet>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default App;
