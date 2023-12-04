import { Box } from "@mui/system";
import { Avatar } from "@mui/joy";
import { Link, useNavigate } from "react-router-dom";
import viteLogo from "/vite.svg";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        background: "#000000",
        color: "#fff",
        padding: "0.3rem 2rem",
        textAlign: "left",
        display: "flex",
        borderBottom: "1px solid #25134a",
      }}
    >
      <Box sx={{ marginTop: "5px" }}>
        <Link to="/">
          <img src={viteLogo} />
        </Link>
      </Box>
      <Box
        sx={{
          marginLeft: "auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {[
          { name: "Transactions", to: "/txs" },
          { name: "My Budget", to: "/budget" },
        ].map((link) => {
          return (
            <Box
              sx={{
                marginRight: "1rem",
                background: "#0d0c19",
                display: "block",
                borderRadius: "6px",
                padding: "0.2rem 0.5rem",
                textDecoration: "none",
                cursor: "pointer",
              }}
              onClick={() => navigate(link.to)}
            >
              {link.name}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
