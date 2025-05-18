import { Dispatch, SetStateAction } from "react";
import { ButtonList } from "./ButtonList";
import { Box, Typography } from "@mui/material";
import { Folder } from "@/type/type";

type Props = {
  selectedFolder: Folder;
  setIsOpenUpdateFolderModal: Dispatch<SetStateAction<boolean>>;
}

export const SingleFolder = ({
  selectedFolder,
  setIsOpenUpdateFolderModal,
}: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Typography
        sx={{
          fontSize: 18,
          fontWeight: 600,
        }}
      >
        {selectedFolder.name}
      </Typography>

      <Box>
        <Typography
          sx={{
            mb: 1,
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          説明
        </Typography>

        <Typography
          sx={{
            fontSize: 15,
            letterSpacing: "1px"
          }}
        >
          {selectedFolder.description}
        </Typography>
      </Box>
      <ButtonList
        currentFolderId={selectedFolder.id}
        photoId={selectedFolder.id}
        setIsOpenUpdateFolderModal={setIsOpenUpdateFolderModal}
      />
    </Box>
  )
}

