import { Dispatch, SetStateAction } from "react";
import { Box } from "@mui/material";
import { SinglePhoto } from "./Information/SinglePhoto";
import { SingleFolder } from "./Information/SingleFolder";
import { File, Folder } from "@/type/type";

type Props = {
  currentFolderId: number;
  selectedFolder: Folder[];
  selectedFile: File[];
  setIsOpenUpdateFolderModal: Dispatch<SetStateAction<boolean>>;
  setIsOpenUpdatePhotoModal: Dispatch<SetStateAction<boolean>>;
  setIsOpenDeletePhotoModal: Dispatch<SetStateAction<boolean>>;
}

export const Information = ({
  currentFolderId,
  selectedFolder,
  selectedFile,
  setIsOpenUpdateFolderModal,
  setIsOpenUpdatePhotoModal,
  setIsOpenDeletePhotoModal,
}: Props) => {
  let Component;

  if (selectedFile.length === 1 && selectedFolder.length === 0) {
    Component =
      <SinglePhoto
        currentFolderId={currentFolderId}
        selectedFile={selectedFile[0]}
        setIsOpenUpdatePhotoModal={setIsOpenUpdatePhotoModal}
        setIsOpenDeletePhotoModal={setIsOpenDeletePhotoModal}
      />;
  } else if (selectedFile.length === 0 && selectedFolder.length === 1) {
    Component =
      <SingleFolder
        selectedFolder={selectedFolder[0]}
        setIsOpenUpdateFolderModal={setIsOpenUpdateFolderModal}
      />;
  } else {
    Component = <p>info</p>;
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
