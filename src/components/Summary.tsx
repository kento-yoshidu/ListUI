import { type Book } from "@/type/type"
import { Box, Chip, Paper, Typography } from "@mui/material"
import { useState } from "react";

export const Summary = ({ selectedItem }: { selectedItem: Book | null }) => {
  console.log("selected = ", selectedItem);

  const [tags, setTags] = useState(selectedItem?.tags || []);
  const [inputValue, setInputValue] = useState("");

  const handleAddTag = () => {
    if (inputValue.trim() && !tags.includes(inputValue.trim())) {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleDeleteTag = (tagToDelete: string) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

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

          {/* タグのリスト */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2, border: "1px solid #444" }}>
            {tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                onDelete={() => handleDeleteTag(tag)}
                sx={{ cursor: "pointer" }}
              />
            ))}
          </Box>
        </Paper>
      )}
    </Box>
  )
}
