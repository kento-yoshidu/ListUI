import { List, ListItem, ListItemText, Typography } from "@mui/material"

import { type Book } from "@/type/type"

export const ListComponent = ({ data, onClick }: { data: Book[], onClick: (item: Book) => void }) => {
  return (
    data ? (
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
            <ListItemText primary={item.id} />
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
      </List>
    ) : (
      <Typography>データが見つかりません</Typography>
    )
  )
}
