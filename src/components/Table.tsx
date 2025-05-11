import { useState } from "react";
import { useGetFiles } from "@/hooks/useGetFiles";
import { Box, Checkbox, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { FILE_TYPE } from "@/constants";
import FolderIcon from "@mui/icons-material/Folder";
import { BreadCrumb } from "@/components/BreadCrumb";
import { Information } from "./Information";
import { Upload } from "./upload";
import { CreateFolderModal } from "./modal/CreateFolderModal";
import { ButtonList } from "./ButtonList";
import { UploadPhotoModal } from "./modal/UploadPhotoModal";

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

  // モーダル開閉管理
  const [isOpenCreateFolderModal, setIsOpenCreateFolderModal] = useState(false);
  const [isOpenUploadPhotoModal, setIsOpenUploadPhotoModal] = useState(false);

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
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <BreadCrumb
          breadcrumbs={data.breadcrumbs}
          setCurrentPath={setCurrentPath}
          setSelectedFolder={setSelectedFolder}
          setSelectedFile={setSelectedFile}
        />

        <ButtonList
          setIsOpenCreateFolderModal={setIsOpenCreateFolderModal}
          setIsOpenUploadPhotoModal={setIsOpenUploadPhotoModal}
        />
      </Box>

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
              backgroundColor: "#ababab",
            }}
          >
            <TableCell sx={{ padding: "4px", width: "54px" }} />
            <TableCell sx={{ padding: "4px" }}>title</TableCell>
            <TableCell sx={{ padding: "4px" }}>description</TableCell>
            <TableCell sx={{ padding: "4px" }}>Uploaded At</TableCell>
          </TableHead>

          <TableBody>
            {data.child_folders.map((folder: any) => (
              <TableRow
                key={folder.id}
                onDoubleClick={() => handleDoubleClick(folder.id)}
                hover
                sx={{
                  cursor: "pointer",
                }}
              >
                <TableCell sx={{ padding: 0 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                      minHeight: '32px',
                    }}
                  >
                    <Checkbox
                      checked={selectedFolder.some((f) => f.id === folder.id)}
                      onClick={() => handleCheckboxChange(folder, FILE_TYPE.Folder)}
                    />
                  </Box>
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
                <TableCell
                  sx={{
                    padding: "0",
                  }}
                >
                  {folder.description}
                </TableCell>
                <TableCell />
              </TableRow>
            ))}

            {data.photos.map((photo: any) => (
              <TableRow
                key={`photo-${photo.id}`}
                hover
                sx={{
                  cursor: "pointer",
                }}
              >
                <TableCell sx={{ padding: 0 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%'
                    }}
                  >
                    <Checkbox
                      checked={selectedFile.some((f) => f.id === photo.id)}
                      onClick={() => handleCheckboxChange(photo, FILE_TYPE.File)}
                    />
                  </Box>
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
                <TableCell>{photo.uploaded_at}</TableCell>
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

      <CreateFolderModal
        open={isOpenCreateFolderModal}
        onClose={setIsOpenCreateFolderModal}
        currentPath={currentPath}
      />

      <UploadPhotoModal
        open={isOpenUploadPhotoModal}
        onClose={setIsOpenUploadPhotoModal}
        currentPath={currentPath}
      />
    </Box>
  )
}
