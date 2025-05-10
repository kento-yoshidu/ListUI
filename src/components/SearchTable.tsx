import { useEffect, useState } from "react";
import { useGetFiles } from "@/hooks/useGetFiles";
import { Box, Checkbox, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { FILE_TYPE } from "@/constants";
import FolderIcon from "@mui/icons-material/Folder";
import { BreadCrumb } from "@/components/BreadCrumb";
import { Information } from "./Information";
import { Upload } from "./upload";
import { CreateFolderModal } from "./modal/CreateFolderModal";
import { useSearch } from "@/hooks/useSearch";

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

export const SearchTableComponent = () => {
  const { data, isLoading } = useSearch();

  console.log("data = ", data);

  const [currentPath, setCurrentPath] = useState<number>(1);
  const [selectedFolder, setSelectedFolder] = useState<Folder[]>([]);
  const [selectedFile, setSelectedFile] = useState<File[]>([]);

  const [isOpenCreateFolderModal, setIsOpenCreateFolderModal] = useState(false);

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
            {data.map((photo: any) => (
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
                {/* Todo: クリックしたらContext更新してフォルダー遷移 */}
                <TableCell>{photo.description}</TableCell>
                <TableCell>{photo.folder_name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {isSelected && (
          <Information
            currentFolderId={currentPath}
            selectedFile={selectedFile}
            selectedFolder={selectedFolder}
          />
        )}
      </Box>

      <button
        onClick={() => setIsOpenCreateFolderModal(true)}
      >
        Open
      </button>
      <Upload
        currentFolderId={currentPath}
      />

      <CreateFolderModal
        open={isOpenCreateFolderModal}
        onClose={setIsOpenCreateFolderModal}
        currentPath={currentPath}
      />
    </Box>
  )
}

