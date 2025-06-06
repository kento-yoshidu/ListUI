import type { Dispatch, SetStateAction } from "react";
import { Box } from "@mui/material";
import { SinglePhoto } from "@/components/Information/SinglePhoto";
import { SingleFolder } from "@/components/Information/SingleFolder";
import type { File, Folder } from "@/type/type";
import { MultiFolder } from "./Information/MultiFolder";

type Props = {
  currentFolderId: number;
  selectedFolder: Folder[];
  selectedFile: File[];
  setIsOpenUpdateFolderModal: Dispatch<SetStateAction<boolean>>;
  setIsOpenUpdatePhotoModal: Dispatch<SetStateAction<boolean>>;
  setIsOpenDeletePhotoModal: Dispatch<SetStateAction<boolean>>;
  setIsOpenDeleteFolderModal: Dispatch<SetStateAction<boolean>>;
  setIsOpenAddTagToPhotoModal: Dispatch<SetStateAction<boolean>>;
}

export const Information = ({
  currentFolderId,
  selectedFolder,
  selectedFile,
  setIsOpenUpdateFolderModal,
  setIsOpenUpdatePhotoModal,
  setIsOpenDeletePhotoModal,
  setIsOpenDeleteFolderModal,
  setIsOpenAddTagToPhotoModal,
}: Props) => {
  let Component;

  if (selectedFile.length === 1 && selectedFolder.length === 0) {
    Component =
      <SinglePhoto
        currentFolderId={currentFolderId}
        selectedFile={selectedFile[0]}
        setIsOpenUpdatePhotoModal={setIsOpenUpdatePhotoModal}
        setIsOpenDeletePhotoModal={setIsOpenDeletePhotoModal}
        setIsOpenAddTagToPhotoModal={setIsOpenAddTagToPhotoModal}
      />;
  } else if (selectedFile.length === 0 && selectedFolder.length === 1) {
    Component =
      <SingleFolder
        selectedFolder={selectedFolder[0]}
        setIsOpenUpdateFolderModal={setIsOpenUpdateFolderModal}
        setIsOpenDeleteFolderModal={setIsOpenDeleteFolderModal}
      />;
  } else if (selectedFile.length === 0 && selectedFolder.length > 1) {
    Component =
      <MultiFolder
        selectedFolder={selectedFolder}
        setIsOpenDeleteFolderModal={setIsOpenDeleteFolderModal}
      />
  }

  return (
    <Box
      sx={{
        p: 3,
        borderLeft: "1px solid #ccc",
        height: "550px",
        overflowY: "auto",
      }}
    >
      {Component}
    </Box>
  )
}
