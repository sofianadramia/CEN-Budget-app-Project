import { useState } from "react";
import { categories, makeBudgets } from "./categories";
import "./App.css";
import { Box } from "@mui/system";
import { Header } from "./Header";
import { Container } from "./Container";
import { BudgetDashboard } from "./BudgetDashboard";
import { useLocalStorage } from "./useLocalStorage";

export const BudgetPage = () => {
  const [budgets, setBudgets] = useLocalStorage("budgets", makeBudgets());

  return (
    <Box>
      <Header />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Container>
          <BudgetDashboard
            budgets={
              budgets.length === 0
                ? categories.map((category) => ({
                    name: category,
                    amount: 0,
                  }))
                : budgets
            }
            setBudgets={setBudgets}
          />
        </Container>
      </Box>
    </Box>
  );
};
