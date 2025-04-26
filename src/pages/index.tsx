import { useState, type MouseEvent } from "react";
import { useGetFiles } from "@/hooks/useGetFiles";
import { Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { BreadCrumb } from "@/components/BreadCrumb";
import FolderIcon from "@mui/icons-material/Folder";
import { FILE_TYPE } from "@/constants";

type Folder = {
  id: number;
  name: string;
};

type File = {
  id: number;
  name: string;
  description: string;
};

export default function Home() {
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

  return (
    <>
      <Typography>子フォルダー一覧 {data.folder.id}</Typography>

      <BreadCrumb
        breadcrumbs={data.breadcrumbs}
        setCurrentPath={setCurrentPath}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead
            sx={{
              backgroundColor: "#989898",
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
                <TableCell onClick={() => setSelectedFolder([folder])}>
                  <FolderIcon />
                  {folder.name}
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
                <TableCell onClick={() => setSelectedFile([photo])}>
                  🖼️
                  {photo.title}
                </TableCell>
                <TableCell>{photo.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
