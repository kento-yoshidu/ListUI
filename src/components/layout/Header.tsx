import { Typography } from "@mui/material";

export const Header = () => (
  <header
    style={{
      gridColumn: "1 / span 2",
      backgroundColor: "#3f51b5",
      color: "white",
      padding: "10px",
    }}
  >
    <Typography variant="h6">header</Typography>
  </header>
);
