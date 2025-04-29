import { useState } from "react";
import { useGetFiles } from "@/hooks/useGetFiles";
import { Box, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { FILE_TYPE } from "@/constants";
import FolderIcon from "@mui/icons-material/Folder";
import { BreadCrumb } from "@/components/BreadCrumb";
import { Information } from "./Information";

export type Folder = {
  id: number;
  name: string;
};

export type File = {
  id: number;
  title: string;
  description: string;
  image_path: string;
  tags: String[];
};

export const TableComponent = () => {
  const [currentPath, setCurrentPath] = useState<number>(1);
  const [selectedFolder, setSelectedFolder] = useState<Folder[]>([]);
  const [selectedFile, setSelectedFile] = useState<File[]>([]);

  const { data, isLoading } = useGetFiles(currentPath);

  const handleDoubleClick = (folderId: number) => {
    setCurrentPath(folderId);
    setSelectedFile([]);
    setSelectedFolder([]);
  };

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

  if (isLoading) {
    return <p>loading</p>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
      }}
    >
      <BreadCrumb
        breadcrumbs={data.breadcrumbs}
        setCurrentPath={setCurrentPath}
      />

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
              height: "24px",
              backgroundColor: "#ababab",
            }}
          >
            <TableCell />
            <TableCell>title</TableCell>
            <TableCell>description</TableCell>
          </TableHead>

          <TableBody>
            {data.child_folders.map((folder: any) => (
              <TableRow
                key={folder.id}
                onDoubleClick={() => handleDoubleClick(folder.id)}
                hover
              >
                <TableCell>
                  <Checkbox
                    checked={selectedFolder.some((f) => f.id === folder.id)}
                    onClick={() => handleCheckboxChange(folder, FILE_TYPE.Folder)}
                  />
                </TableCell>
                <TableCell
                  onClick={() => {
                    setSelectedFolder([folder])
                    setSelectedFile([])
                  }}
                >
                  <FolderIcon />
                  {`${folder.name} (id=${folder.id})`}
                </TableCell>
                <TableCell>{folder.description}</TableCell>
              </TableRow>
            ))}

            {data.photos.map((photo: any) => (
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
                  {`${photo.title} (id=${photo.id})`}
                </TableCell>
                <TableCell>{photo.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {isSelected && (
          <Information
            selectedFile={selectedFile}
            selectedFolder={selectedFolder}
          />
        )}
      </Box>
    </Box>
  )
}
