import { useState } from "react";
import { categories } from "./categories";
import "./App.css";
import { Box } from "@mui/system";
import { Header } from "./Header";
import { Container } from "./Container";
import { BudgetDashboard } from "./BudgetDashboard";
import { useLocalStorage } from "./useLocalStorage";
import {
  Button,
  Table,
  Typography,
  Sheet,
  FormControl,
  Input,
  FormLabel,
  Select,
  Option,
  Chip,
} from "@mui/joy";

export const TxsPage = () => {
  const [txs, setTxs] = useLocalStorage("txs", []);
  const [editing, setEditing] = useState(false);
  const [pendingTx, setPendingTx] = useState({
    id: 0,
    name: "",
    amount: 0,
    category: categories[0],
  });

  return (
    <Box>
      <Header />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Container>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ textAlign: "center" }}>
              <Typography level="h1">Transactions</Typography>
            </Box>
            <Box sx={{ margin: "2rem auto" }}>
              {editing ? (
                <Box>
                  <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input
                      type="text"
                      value={pendingTx.name}
                      onChange={(e) =>
                        setPendingTx((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                    />
                  </FormControl>
                  <FormControl sx={{ marginTop: "1rem" }}>
                    <FormLabel>Amount</FormLabel>
                    <Input
                      type="number"
                      startDecorator="$"
                      placeholder="$0.00"
                      value={pendingTx.amount}
                      onChange={(e) =>
                        setPendingTx((prev) => ({
                          ...prev,
                          amount:
                            parseFloat(e.target.value) || pendingTx.amount,
                        }))
                      }
                    />
                  </FormControl>
                  <FormControl sx={{ marginTop: "1rem" }}>
                    <FormLabel>Category</FormLabel>
                    <Select
                      value={pendingTx.category}
                      onChange={(e, value) =>
                        setPendingTx((prev) => {
                          return {
                            ...prev,
                            category: value,
                          };
                        })
                      }
                    >
                      {categories.map((category) => (
                        <Option value={category}>{category}</Option>
                      ))}
                    </Select>
                  </FormControl>
                  <Box sx={{ marginTop: "1rem" }}>
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={() => {
                        setTxs((prev) => [...prev, pendingTx]);
                        setEditing(false);
                      }}
                    >
                      Save
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Button variant="outlined" onClick={() => setEditing(true)}>
                  New Transaction
                </Button>
              )}
            </Box>
            <Box sx={{ width: "50%", margin: "1rem auto" }}>
              {txs.length > 0 ? (
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
                      {txs.map((row) => (
                        <tr key={row.id}>
                          <td>{row.name}</td>
                          <td>${row.amount}</td>
                          <td>
                            <Chip color="primary">{row.category}</Chip>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Sheet>
              ) : null}
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
