import { type Book } from "@/type/type"
import { Box, Paper, Typography } from "@mui/material"

export const Summary = ({ selectedItem }: { selectedItem: Book | null }) => {
  return (
    <Box
      sx={{
        flex: 1,
        marginTop: 2,
        padding: 2,
        border: "1px solid #ddd",
        backgroundColor: "white",
        minHeight: "10vh",
      }}
    >
      {selectedItem && (
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h6">{selectedItem.title}</Typography>
          <Typography variant="body1">{selectedItem.content}</Typography>
        </Paper>
      )}
    </Box>
  )
}
