import './App.css';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';

type Data = {
  id: string
  title: string
  summary: string
}

const ListComponent = ({ data }: { data: Data[] }) => {
  return (
    <List sx={{
      margin: "15px 0",
      padding: 0,
      border: "1px solid #aaa",
    }}>
      {data.map((item) => (
        <ListItem
          sx={{
            borderBottom: "1px solid #ddd",
            transition: "0.3s",
            "&:hover": {
              backgroundColor: "#f0f0f0",
              cursor: "pointer",
            }
          }}
        >
          <ListItemText primary={item.title} />
        </ListItem>
      ))}

    </List>
  )
}

function App() {
  const data = [
    {
      id: "1",
      title: "Rust",
      summary: "aaaaaaaaaaaaaaaaaaaaa",
    },
    {
      id: "2",
      title: "Erlang",
      summary: "bbbbbbbbbbbbbbbbbbbbb",
    },
    {
      id: "3",
      title: "F#",
      summary: "cccc",
    },
    {
      id: "4",
      title: "TypeScript",
      summary: "bbbbbbbbbbbbbbbbbbbbb",
    },
    {
      id: "5",
      title: "Common Lisp",
      summary: "bbbbbbbbbbbbbbbbbbbbb",
    },
    {
      id: "6",
      title: "Scala",
      summary: "bbbbbbbbbbbbbbbbbbbbb",
    },
    {
      id: "7",
      title: "Haskell",
      summary: "bbbbbbbbbbbbbbbbbbbbb",
    },
    {
      id: "8",
      title: "C++",
      summary: "bbbbbbbbbbbbbbbbbbbbb",
    },
  ];

  return (
    <Box sx={{
      width: "95%",
      height: "80vh",
      margin: "9vh auto",
      padding: 2,
      border: "1px solid #aaa",
    }}>
      <Typography
        variant="h1"
        sx={{
          fontSize: 30,
          fontWeight: "bold",
        }}
      >
        List
      </Typography>

      <ListComponent data={data} />
    </Box>
  )
}

export default App
