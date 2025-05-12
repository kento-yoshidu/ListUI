import { Dispatch, SetStateAction } from "react";
import { Box } from "@mui/material";
import { File, Folder } from "./Table";
import { SinglePhoto } from "./Information/SinglePhoto";
import { SingleFolder } from "./Information/SingleFolder";

type Props = {
  currentFolderId: number;
  selectedFolder: Folder[];
  selectedFile: File[];
  setIsOpenUpdateFolderModal: Dispatch<SetStateAction<boolean>>;
}

export const Information = ({
  currentFolderId,
  selectedFolder,
  selectedFile,
  setIsOpenUpdateFolderModal,
}: Props) => {
  let Component;

  if (selectedFile.length === 1 && selectedFolder.length === 0) {
    Component =
      <SinglePhoto
        currentFolderId={currentFolderId}
        selectedFile={selectedFile[0]}
        setIsOpenUpdateFolderModal={setIsOpenUpdateFolderModal}
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
        borderLeft: "1px solid #444",
      }}
    >
      {Component}
    </Box>
  )
}
