import { useState } from "react";
import { useGetFiles } from "@/apis/useGetFiles";
import { Box, Checkbox, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import ImageIcon from '@mui/icons-material/Image';
import { BreadCrumb } from "@/components/BreadCrumb";
import { Information } from "@/components/Information";
import { ButtonList } from "@/components/ButtonList";
import { NoFiles } from "@/components/Table/Nofiles";
import { PageTitle } from "@/components/common/PageTitle";
import { CreateFolderModal } from "@/modal/CreateFolderModal";
import { UploadPhotoModal } from "@/modal/UploadPhotoModal";
import { UpdateFolderModal } from "@/modal/UpdateFolderModal";
import { UpdatePhotoModal } from "@/modal/UpdatePhotoModal";
import { DeletePhotoModal } from "@/modal/DeletePhotoModal";
import { DeleteFolderModal } from "@/modal/DeleteFolderModal";
import { FILE_TYPE } from "@/constants";
import type { File, Folder } from "@/type/type";
import { useMoveFile } from "./hooks/useMoveFile";
import { AddTagToPhotoModal } from "@/modal/AddTagToPhotoModal";

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
  const [isOpenDeleteFolderModal, setIsOpenDeleteFolderModal] = useState(false);
  const [isOpenAddTagToPhotoModal, setIsOpenAddTagToPhotoModal] = useState(false);

  const { data, isLoading } = useGetFiles(currentPath);
  const {
    handleDragStart,
    handleDrop,
    handleDragOver,
  } = useMoveFile({
    selectedFile,
  });

  const handleDoubleClick = (folderId: number) => {
    setCurrentPath(folderId);
    setSelectedFile([]);
    setSelectedFolder([]);
  };

  const photoCount = selectedFolder.reduce((sum, folder) => {
    return sum + folder.total_photo_count;
  }, 0);

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
            {isLoading && (
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
            )}

            {!isLoading &&
              data.child_folders.length === 0 &&
              data.photos.length === 0 && (
                <>
                  <NoFiles
                    setIsOpenCreateFolderModal={setIsOpenCreateFolderModal}
                    setIsOpenUploadPhotoModal={setIsOpenUploadPhotoModal}
                  />
                </>
              )
            }

            <>
              {!isLoading &&
                data.child_folders.length > 0 &&
                data.child_folders.map((folder: Folder) => (
                  <TableRow
                    key={folder.id}
                    onDoubleClick={() => handleDoubleClick(folder.id)}
                    hover
                    draggable
                    onDrop={(e) => handleDrop(e, folder)}
                    onDragOver={handleDragOver}
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

            {!isLoading &&
              data.photos.length > 0 &&
              data.photos.map((photo: any) => {
                return (
                  <TableRow
                    key={`photo-${photo.id}`}
                    hover
                    draggable
                    sx={{
                      cursor: "pointer",
                    }}
                    onDragStart={(e) => handleDragStart(photo)}
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
                      {`${photo.name} (id=${photo.id})`}
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
                )
              }
            )}
            </>
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
            setIsOpenDeleteFolderModal={setIsOpenDeleteFolderModal}
            setIsOpenAddTagToPhotoModal={setIsOpenAddTagToPhotoModal}
          />
        )}
      </Box>

      {/* フォルダー作成モーダル */}
      <CreateFolderModal
        open={isOpenCreateFolderModal}
        onClose={() => setIsOpenCreateFolderModal(false)}
        currentPath={currentPath}
      />
      {/* フォルダー更新モーダル */}
      <UpdateFolderModal
        open={isOpenUpdateFolderModal}
        onClose={() => setIsOpenUpdateFolderModal(false)}
        currentPath={currentPath}
        selectedFolder={selectedFolder[0]}
        setSelectedFolder={setSelectedFolder}
      />
      {/* フォルダー削除モーダル */}
      <DeleteFolderModal
        open={isOpenDeleteFolderModal}
        onClose={() => setIsOpenDeleteFolderModal(false)}
        currentPath={currentPath}
        selectedFolder={selectedFolder}
        setSelectedFolder={setSelectedFolder}
        photoCount={photoCount}
      />
      {/* 写真登録モーダル */}
      <UploadPhotoModal
        open={isOpenUploadPhotoModal}
        onClose={() => setIsOpenUploadPhotoModal(false)}
        currentPath={currentPath}
      />
      {/* 写真更新モーダル */}
      <UpdatePhotoModal
        open={isOpenUpdatePhotoModal}
        onClose={() => setIsOpenUpdatePhotoModal(false)}
        currentPath={currentPath}
        selectedPhoto={selectedFile[0]}
        setSelectedPhoto={setSelectedFile}
      />
      {/* 写真削除モーダル */}
      <DeletePhotoModal
        open={isOpenDeletePhotoModal}
        onClose={() => setIsOpenDeletePhotoModal(false)}
        currentPath={currentPath}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
      />
      <AddTagToPhotoModal
        open={isOpenAddTagToPhotoModal}
        onClose={() => setIsOpenAddTagToPhotoModal(false)}
        selectedFiles={selectedFile}
        setSelectedFile={setSelectedFile}
      />
    </Box>
  )
}
