import { Box, Button } from "@mui/material"
import { Dispatch, SetStateAction } from "react"

type Props = {
  setIsOpenCreateFolderModal: Dispatch<SetStateAction<boolean>>;
  setIsOpenUploadPhotoModal: Dispatch<SetStateAction<boolean>>;
}

export const ButtonList = ({
  setIsOpenCreateFolderModal,
  setIsOpenUploadPhotoModal,
}: Props) => {
  const handleCreateFolderClick = () => {
    setIsOpenCreateFolderModal(true);
  };

  const handleUploadPhotoClick = () => {
    setIsOpenUploadPhotoModal(true);
  };

  return (
    <Box
      sx={{
        display: "flex",
        px: 6,
        gap: 2,
      }}
    >
      <Button
        variant="outlined"
        onClick={handleCreateFolderClick}
        sx={{ textTransform: "none" }}
      >
        Create Folder
      </Button>

      <Button
        variant="outlined"
        onClick={handleUploadPhotoClick}
        sx={{ textTransform: "none" }}
      >
        Upload Photo
      </Button>
    </Box>
  )
}
