import { Typography } from "@mui/material";

export const PageTitle = ({ title }: { title: string }) => (
  <Typography
    sx={{
      fontSize: 24,
      fontWeight: 600,
    }}
  >
    {title}
  </Typography>
)