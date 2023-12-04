import { Input, Typography } from "@mui/joy";
import { Box } from "@mui/system";
import { useState } from "react";

const colors = ["#0a0d18", "#3b8d61", "#140918"];

export const BudgetTile = ({ budget, color, width, update, disable }) => {
  const [editing, setEditing] = useState(false);

  return (
    <Box
      sx={{
        background: disable ? "#000" : color ?? "#000",
        padding: "1.5rem 1rem",
        borderRadius: "6px",
        color: "#fff",
        marginRight: "0.5rem",
        marginBottom: "0.5rem",
        width: width ?? "200px",
        position: "relative",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "10px",
          right: "10px",
          cursor: "pointer",
        }}
      >
        {!disable ? (
          editing ? (
            <Box
              onClick={() => {
                setEditing(false);
              }}
            >
              Save
            </Box>
          ) : (
            <Box onClick={() => setEditing(true)}>Edit</Box>
          )
        ) : null}
      </Box>

      <Box sx={{ fontSize: "1.2rem" }}>{budget.name}</Box>
      {editing ? (
        <Box>
          <Input
            type="number"
            variant="soft"
            onChange={(e) => update && update(e.target.value)}
          />
        </Box>
      ) : (
        <Box sx={{ fontSize: "2rem", fontWeight: "bold" }}>
          ${budget.amount}
        </Box>
      )}
    </Box>
  );
};

export const BudgetDashboard = ({ budgets, setBudgets }) => {
  return (
    <Box sx={{ maxWidth: "700px" }}>
      <Typography level="h2" sx={{ marginBottom: "1rem" }}>
        My Budget
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <BudgetTile
          budget={{
            name: "Total",
            amount: budgets.reduce((acc, a) => {
              return parseFloat(acc) + parseFloat(a.amount);
            }, 0),
          }}
          width={"300px"}
          disable={true}
          color="#000"
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          marginTop: "1rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {budgets.map((budget, i) => (
          <BudgetTile
            budget={budget}
            color={colors[i % colors.length]}
            update={(value) => {
              setBudgets((prev) => {
                return budgets.map((budget, k) => {
                  if (i == k) {
                    return {
                      ...budget,
                      amount: parseFloat(value),
                    };
                  }

                  return budget;
                });
              });
            }}
          />
        ))}
      </Box>
    </Box>
  );
};
