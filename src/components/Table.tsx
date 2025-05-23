import { useState } from "react";
import { useGetFiles } from "@/apis/useGetFiles";
import { Box, Checkbox, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { FILE_TYPE } from "@/constants";
import FolderIcon from "@mui/icons-material/Folder";
import { BreadCrumb } from "@/components/BreadCrumb";
import { Information } from "./Information";
import { CreateFolderModal } from "../modal/CreateFolderModal";
import { ButtonList } from "./ButtonList";
import { UploadPhotoModal } from "../modal/UploadPhotoModal";
import ImageIcon from '@mui/icons-material/Image';
import { UpdateFolderModal } from "../modal/UpdateFolderModal";
import { UpdatePhotoModal } from "../modal/UpdatePhotoModal";
import { NoFiles } from "./Table/Nofiles";
import { PageTitle } from "./common/PageTitle";
import { DeletePhotoModal } from "@/modal/DeletePhotoModal";
import type { File, Folder } from "@/type/type";

export const TableComponent = () => {
  const [currentPath, setCurrentPath] = useState<number>(1);
  const [selectedFolder, setSelectedFolder] = useState<Folder[]>([]);
  const [selectedFile, setSelectedFile] = useState<File[]>([]);

  // モーダル開閉管理
  const [isOpenCreateFolderModal, setIsOpenCreateFolderModal] = useState(false);
  const [isOpenUpdateFolderModal, setIsOpenUpdateFolderModal] = useState(false);
  const [isOpenUpdatePhotoModal, setIsOpenUpdatePhotoModal] = useState(false);
  const [isOpenUploadPhotoModal, setIsOpenUploadPhotoModal] = useState(false);
  const [isOpenDeletePhotoModal, setIsOpenDeletePhotoModal] = useState(false);

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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        gap: 2,
      }}
    >
      <PageTitle title="ファイル一覧" />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <BreadCrumb
          breadcrumbs={data?.breadcrumbs}
          setCurrentPath={setCurrentPath}
          setSelectedFolder={setSelectedFolder}
          setSelectedFile={setSelectedFile}
          isLoading={isLoading}
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
          alignItems: "start",
          border: "1px solid #ccc",
          height: "600px",
          maxHeight: "80vh",
        }}
      >
        <Table
          sx={{
            width: "100%",
            fontWeight: 900,
          }}
        >
          <TableHead
            sx={{
              backgroundColor: "rgb(187, 196, 200)",
            }}
          >
            <TableRow>
              <TableCell sx={{ padding: "4px", width: "54px" }} />
              <TableCell sx={{ padding: "4px", color: "rgb(64, 90, 102)", fontWeight: 600 }}>title</TableCell>
              <TableCell sx={{ padding: "4px", color: "rgb(64, 90, 102)", fontWeight: 600 }}>description</TableCell>
              <TableCell sx={{ padding: "4px", color: "rgb(64, 90, 102)", fontWeight: 600 }}>Uploaded At</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  align="center"
                  sx={{ height: "300px" }}
                >
                  <Typography variant="body1" color="text.secondary">
                    Loading...
                  </Typography>
                </TableCell>
              </TableRow>
            ) : data.child_folders.length === 0 && data.photos.length === 0 ? (
              <>
                <NoFiles
                  setIsOpenCreateFolderModal={setIsOpenCreateFolderModal}
                  setIsOpenUploadPhotoModal={setIsOpenUploadPhotoModal}
                />
              </>
            ) : (
              <>
                {data.child_folders.map((folder: any) => (
                <TableRow
                  key={folder.id}
                  onDoubleClick={() => handleDoubleClick(folder.id)}
                  hover
                  sx={{
                    cursor: "pointer",
                    fontWeight: 900,
                    p: 0,
                  }}
                >
                  <TableCell
                    sx={{
                      p: 0,
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        p: 0,
                      }}
                    >
                      <Checkbox
                        checked={selectedFolder.some((f) => f.id === folder.id)}
                        onClick={() => handleCheckboxChange(folder, FILE_TYPE.Folder)}
                      />
                    </Box>
                  </TableCell>

                  <TableCell
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      height: "56px",
                      gap: 1,
                      fontWeight: 600,
                      p: 0,
                    }}
                    onClick={() => {
                      setSelectedFolder([folder])
                      setSelectedFile([])
                    }}
                  >
                    <FolderIcon
                      sx={{
                        color: "orange",
                        fontSize: 28,
                      }}
                    />
                    {`${folder.name} (id=${folder.id})`}
                  </TableCell>
                  <TableCell
                    sx={{
                      padding: "0",
                      fontWeight: 600,
                    }}
                  >
                    {folder.description}
                  </TableCell>
                  <TableCell sx={{ p: 0 }} />
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
                  <TableCell sx={{ p: 0 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: 'center',
                        alignItems: 'center',
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
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      fontWeight: 600,
                      p: 0,
                      height: "56px",
                    }}
                  >
                    <ImageIcon
                      sx={{
                        fontSize: 28,
                        color: "#1976d2",
                      }}
                    />
                    {`${photo.title} (id=${photo.id})`}
                  </TableCell>
                  <TableCell
                    sx={{
                      p: 0,
                      fontWeight: 600,
                    }}
                  >
                    {photo.description}
                  </TableCell>
                  <TableCell
                    sx={{
                      p: 0,
                      fontWeight: 600,
                    }}
                  >
                    {photo.uploaded_at}
                  </TableCell>
                </TableRow>
              ))}
            </>
            )}
          </TableBody>
        </Table>

        {isSelected && (
          <Information
            currentFolderId={currentPath}
            selectedFile={selectedFile}
            selectedFolder={selectedFolder}
            setIsOpenUpdateFolderModal={setIsOpenUpdateFolderModal}
            setIsOpenUpdatePhotoModal={setIsOpenUpdatePhotoModal}
            setIsOpenDeletePhotoModal={setIsOpenDeletePhotoModal}
          />
        )}
      </Box>

      {/* フォルダーモーダル */}
      <CreateFolderModal
        open={isOpenCreateFolderModal}
        onClose={setIsOpenCreateFolderModal}
        currentPath={currentPath}
      />
      <UpdateFolderModal
        open={isOpenUpdateFolderModal}
        onClose={setIsOpenUpdateFolderModal}
        currentPath={currentPath}
        selectedFolder={selectedFolder[0]}
        setSelectedFolder={setSelectedFolder}
      />
      {/* 写真モーダル */}
      <UploadPhotoModal
        open={isOpenUploadPhotoModal}
        onClose={() => setIsOpenUploadPhotoModal(false)}
        currentPath={currentPath}
      />
      <UpdatePhotoModal
        open={isOpenUpdatePhotoModal}
        onClose={() => setIsOpenUpdatePhotoModal(false)}
        currentPath={currentPath}
        selectedPhoto={selectedFile[0]}
        setSelectedPhoto={setSelectedFile}
      />
      <DeletePhotoModal
        open={isOpenDeletePhotoModal}
        onClose={() => setIsOpenDeletePhotoModal(false)}
        currentPath={currentPath}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
      />
    </Box>
  )
}
