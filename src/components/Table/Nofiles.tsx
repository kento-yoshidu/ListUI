import type { Dispatch, SetStateAction } from "react";
import { Box, TableCell, TableRow, Typography } from "@mui/material"
import { MyButton as Button } from "@/components/common/MyButton"

type Props = {
  setIsOpenCreateFolderModal: Dispatch<SetStateAction<boolean>>;
  setIsOpenUploadPhotoModal: Dispatch<SetStateAction<boolean>>;
};

export const NoFiles = ({
  setIsOpenCreateFolderModal,
  setIsOpenUploadPhotoModal
}: Props) => {
  return (
    <TableRow>
      <TableCell
        colSpan={4}
        align="center"
        sx={{ height: "536px" }}
      >
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          このフォルダーには、写真もフォルダーもありません。
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
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
      </TableCell>
    </TableRow>
  )
}
