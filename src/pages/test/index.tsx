import type { DragEvent } from "react";
import { Box, Table, TableBody, TableCell, TableRow } from "@mui/material";

const TestList = () => {
  let files = [
    {
      id: 1,
      name: "folder1",
    },
    {
      id: 2,
      name: "folder2",
    },
    {
      id: 3,
      name: "folder3",
    },
    {
      id: 4,
      name: "folder4",
    },
    {
      id: 5,
      name: "folder5",
    },
  ];

  const handleDragStart = (
    e: DragEvent<HTMLTableRowElement>,
    file: {
      id: number;
      name: string;
  }) => {
    console.log("Dragging:", file.id, file.name);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Table
        sx={{
          height: "80vh",
          width: "80%",
          border: "1px solid #444",
        }}
      >
        <TableBody
          sx={{
            p: 4,
          }}
        >
          {files.map((file) => {
            return (
              <TableRow
                draggable
                key={file.id}
                onDragStart={(e) => handleDragStart(e, file)}
              >
                <TableCell
                >
                  {file.name}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Box>
  );
};

export default TestList;
