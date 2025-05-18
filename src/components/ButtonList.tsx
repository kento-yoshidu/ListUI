import { Box } from "@mui/material"
import { Dispatch, SetStateAction } from "react"
import { MyButton as Button } from "./common/MyButton"

type Props = {
  setIsOpenCreateFolderModal: Dispatch<SetStateAction<boolean>>;
  setIsOpenUploadPhotoModal: Dispatch<SetStateAction<boolean>>;
}

export const ButtonList = ({
  setIsOpenCreateFolderModal,
  setIsOpenUploadPhotoModal,
}: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        px: 6,
        gap: 2,
      }}
    >
      <Button
        text="Create Folder"
        handleClick={setIsOpenCreateFolderModal}
      />

      <Button
        text="Upload Photo"
        handleClick={setIsOpenUploadPhotoModal}
      />
    </Box>
  )
}
