import { Box, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import SearchForm from '@/components/SearchForm'
import { useSearchParams } from 'next/navigation'

import { ListComponent } from '@/components/List'
import { Summary } from '@/components/Summary'

import { type Book } from '@/type/type'

const fetchData = async (id?: string) => {
  const url = id ? `http://localhost:8080/books/search?id=${id}` : "http://localhost:8080/books"
  console.log("url = ", url);

  const res = await fetch(url);
  console.log("res = ", res);
  return res.json();
}

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<Book | null>(null);

  const searchParams = useSearchParams();

  const id = searchParams.get("id") || "";

  const { data, error, isLoading } = useQuery({
    queryKey: ["books", id],
    queryFn: () => fetchData(id),
  });

  useEffect(() => {
    setSelectedItem(null);

    if (id && data) {
      const foundItem = data.find((item: Book) => item.id === id);
      if (foundItem) {
        setSelectedItem(foundItem);
      }
    }
  }, [id, data]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <Box sx={{
      width: "95%",
      height: "80vh",
      margin: "9vh auto",
      padding: 2,
      border: "1px solid #aaa",
    }}>
      <SearchForm />

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
