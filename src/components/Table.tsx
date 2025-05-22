import { Dispatch, SetStateAction, useRef, useState } from "react";
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
import { useDrag, useDrop } from 'react-dnd';
import type { File, Folder } from "@/type/type";

const ItemTypes = {
  PHOTO: 'photo',
};

type PhotoRowProps = {
  photo: File;
  selectedFile: File[];
  handleCheckboxChange: (photo: File, type: string) => void;
  setSelectedFile: Dispatch<SetStateAction<File[]>>;
};

export const PhotoRow = ({
  photo,
  selectedFile,
  handleCheckboxChange,
  setSelectedFile,
}: PhotoRowProps) => {
  const ref = useRef<HTMLTableRowElement>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.PHOTO,
    item: { id: photo.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  drag(ref);

  return (
    <TableRow
      key={`photo-${photo.id}`}
      hover
      ref={ref}
      sx={{
        cursor: "pointer",
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <TableCell sx={{ p: 0 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Checkbox
            checked={selectedFile.some((f) => f.id === photo.id)}
            onClick={() => handleCheckboxChange(photo, "File")}
          />
        </Box>
      </TableCell>

      <TableCell
        onClick={() => {
          setSelectedFile([photo]);
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
        <ImageIcon sx={{ fontSize: 28, color: "#1976d2" }} />
        {`${photo.title} (id=${photo.id})`}
      </TableCell>

      <TableCell sx={{ p: 0, fontWeight: 600 }}>{photo.description}</TableCell>
      <TableCell sx={{ p: 0, fontWeight: 600 }}>{photo.uploaded_at}</TableCell>
    </TableRow>
  );
};

type FolderRowProps = {
  folder: Folder;
  movePhotoToFolder: any;
  selectedFolder: Folder[];
  handleCheckboxChange: any;
  setSelectedFolder: any;
  setSelectedFile: any;
  setCurrentPath: any;
};

const FolderRow = ({
  folder,
  movePhotoToFolder,
  selectedFolder,
  handleCheckboxChange,
  setSelectedFolder,
  setSelectedFile,
  setCurrentPath,
}: FolderRowProps) => {
  const ref = useRef<HTMLTableRowElement>(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.PHOTO,
    drop: (item: { id: number }) => {
      movePhotoToFolder(item.id, folder.id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  drop(ref);

  const handleDoubleClick = () => {
    setSelectedFile([]);
    setSelectedFolder([]);
    setCurrentPath(folder.id); // currentPathのstateをここに渡すかpropsで更新関数を受け取る
  };

  return (
    <TableRow
      key={folder.id}
      ref={ref}
      onDoubleClick={handleDoubleClick}
      hover
      sx={{
        cursor: "pointer",
        fontWeight: 900,
        p: 0,
      }}
    >
      <TableCell sx={{ p: 0 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 0 }}>
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
        <FolderIcon sx={{ color: "orange", fontSize: 28 }} />
        {`${folder.name} (id=${folder.id})`}
      </TableCell>
      <TableCell sx={{ padding: "0", fontWeight: 600 }}>{folder.description}</TableCell>
      <TableCell sx={{ p: 0 }} />
    </TableRow>
  );
};

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

  const movePhotoToFolder = (photoId: number, folderId: number) => {
    console.log(`Move photo ${photoId} to folder ${folderId}`);
    // TODO: ここでAPI呼び出しなど
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
                {data.child_folders.map((folder: any) => {
                  return (
                    <FolderRow
                      key={folder.id}
                      folder={folder}
                      movePhotoToFolder={movePhotoToFolder}
                      selectedFolder={selectedFolder}
                      handleCheckboxChange={handleCheckboxChange}
                      setSelectedFolder={setSelectedFolder}
                      setSelectedFile={setSelectedFile}
                      setCurrentPath={setCurrentPath}
                    />
                  )
              })}

              {data.photos.map((photo: any) => {
                return (
                  <PhotoRow
                    key={`photo-${photo.id}`}
                    photo={photo}
                    selectedFile={selectedFile}
                    handleCheckboxChange={handleCheckboxChange}
                    setSelectedFile={setSelectedFile}
                  />
                )
              })}
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
