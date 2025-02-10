import { Box, List, ListItem, ListItemText, Paper, Typography } from '@mui/material'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

type Data = {
  id: string
  title: string
  content: string
}

const fetchData = async () => {
  console.log("fetch");
  const res = await fetch("http://localhost:8080/books");
  console.log("res = ", res);
  return res.json();
}

const ListComponent = ({ data, onClick }: { data: Data[], onClick: (item: Data) => void }) => {
  console.log("data = ", data);

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
          <Typography variant="body1">{selectedItem.content}</Typography>
        </Paper>
      )}
    </Box>
  )
}

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<Data | null>(null);

  const { data, error, isLoading } = useQuery({
    queryKey: ["books"],
    queryFn: fetchData,
  });

  if (isLoading) return <p>Loading...</p>;

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
