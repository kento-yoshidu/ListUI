import { Box, Typography } from "@mui/material";
import { TableComponent } from "@/components/Table";

export default function Home() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
        gridTemplateColumns: '150px 1fr',
        height: '100vh',
      }}
    >
      <header style={{ gridColumn: '1 / span 2', backgroundColor: '#3f51b5', color: 'white', padding: '10px' }}>
        <Typography variant="h6">header</Typography>
      </header>

      <aside style={{ backgroundColor: '#f4f4f4', padding: '20px' }}>
        <Typography variant="h6">side</Typography>
      </aside>

      <main
        style={{
          padding: "10px",
        }}
      >
        <TableComponent />
      </main>

      <footer style={{ gridColumn: '1 / span 2', backgroundColor: '#3f51b5', color: 'white', padding: '10px', textAlign: 'center' }}>
        <Typography variant="body2">footer</Typography>
      </footer>
    </Box>
  )
}
