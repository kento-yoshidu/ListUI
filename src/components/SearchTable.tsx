import { useState } from "react";
import { Box, Checkbox, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { FILE_TYPE } from "@/constants";
import { useSearch } from "@/hooks/useSearch";
import type { File, Folder } from "@/type/type";

export const SearchTableComponent = () => {
  const { data, isLoading } = useSearch();

  const [currentPath] = useState<number>(1);
  const [selectedFolder, setSelectedFolder] = useState<Folder[]>([]);
  const [selectedFile, setSelectedFile] = useState<File[]>([]);

  const handleCheckboxChange = (clicked: Folder | File, type: string) => {
    if (type === FILE_TYPE.Folder) {
      setSelectedFolder((prev) => {
        const exists = prev.find(f => f.id === clicked.id);
        if (exists) {
          return prev.filter(f => f.id !== clicked.id);
        } else {
          return [...prev, clicked as Folder];
        }
      });
    } else if (type === FILE_TYPE.File) {
      setSelectedFile((prev) => {
        const exists = prev.find(f => f.id === clicked.id);

        if (exists) {
          return prev.filter(f => f.id !== clicked.id);
        } else {
          return [...prev, clicked as File];
        }
      });
    } else {
      console.error("無効なファイルタイプ");
    }
  };

  const isSelected = selectedFile.length !== 0 || selectedFolder.length !== 0;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: isSelected
            ? "3fr 1fr"
            : "1fr",
          gap: 2,
        }}
      >
        <Table
          sx={{
            width: "100%",
          }}
        >
          <TableHead
            sx={{
              height: "34px",
              backgroundColor: "#ababab",
            }}
          >
            <TableCell sx={{ padding: "4px", width: "30px" }} />
            <TableCell sx={{ padding: "4px" }}>title</TableCell>
            <TableCell sx={{ padding: "4px" }}>description</TableCell>
            <TableCell sx={{ padding: "4px" }}>Folder</TableCell>
          </TableHead>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4}>
                  <p>loading</p>
                </TableCell>
              </TableRow>
            ) : (
              data.map((photo: any) => (
                <TableRow key={`photo-${photo.id}`}>
                  <TableCell>
                    <Checkbox
                      checked={selectedFile.some((f) => f.id === photo.id)}
                      onClick={() => handleCheckboxChange(photo, FILE_TYPE.File)}
                    />
                  </TableCell>
                  <TableCell
                    onClick={() => {
                      setSelectedFolder([])
                      setSelectedFile([photo])
                    }}
                  >
                    🖼️
                    {`${photo.name} (${photo.id})`}
                  </TableCell>
                  {/* Todo: クリックしたらContext更新してフォルダー遷移 */}
                  <TableCell>{photo.description}</TableCell>
                  <TableCell>{photo.folder_name}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* {isSelected && (
          <Information
            currentFolderId={currentPath}
            selectedFile={selectedFile}
            selectedFolder={selectedFolder}
          />
        )} */}
      </Box>
    </Box>
  )
}

