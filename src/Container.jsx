import { Box } from "@mui/system";

export const Container = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        // background: "#333",
        flexDirection: "column",
        padding: "2rem",
        borderRadius: "6px",
        marginTop: "1rem",
      }}
    >
      {children}
    </Box>
  );
};
