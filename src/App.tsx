import { useState } from 'react';
import './App.css';
import { Box, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';

type Data = {
  id: string
  title: string
  summary: string
}

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

const ListComponent = ({ data, onClick }: { data: Data[], onClick: (item: Data) => void }) => {
  return (
    <List sx={{
      margin: "15px 0",
      padding: 0,
      border: "1px solid #aaa",
    }}>
      {data.map((item) => (
        <ListItem
          key={item.id}
          onClick={() => onClick(item)}
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

const Summary = ({ selectedItem }: { selectedItem: Data | null }) => {
  return (
    <Box
      sx={{
        flex: 1,
        marginTop: 2,
        padding: 2,
        border: "1px solid #ddd",
        borderRadius: 1,
        backgroundColor: "white",
        minHeight: "10vh",
      }}
    >
      {selectedItem && (
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h6">{selectedItem.title}</Typography>
          <Typography variant="body1">{selectedItem.summary}</Typography>
        </Paper>
      )}
    </Box>
  )
}

function App() {
  const [selectedItem, setSelectedItem] = useState<Data | null>(null);

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

      <Typography
        variant="h2"
        sx={{
          margin: "10px 0",
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        {selectedItem?.title}
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        <Box
          sx={{
            flex: selectedItem ? 1 : 2,
            transition: "0.3s",
          }}
        >
          <ListComponent data={data} onClick={setSelectedItem} />
        </Box>

        {selectedItem && (
          <Box
            sx={{
              flex: 1,
              transition: "0.3s",
            }}
          >
            <Summary selectedItem={selectedItem} />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default App
