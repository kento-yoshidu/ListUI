import type { Dispatch, SetStateAction } from "react";
import { ButtonList } from "./ButtonList";
import { Box, Typography } from "@mui/material";
import type { Folder } from "@/type/type";
import { formatFileSize } from "@/utils/photo";

type Props = {
  selectedFolder: Folder;
  setIsOpenUpdateFolderModal: Dispatch<SetStateAction<boolean>>;
  setIsOpenDeleteFolderModal: Dispatch<SetStateAction<boolean>>;
}

export const SingleFolder = ({
  selectedFolder,
  setIsOpenUpdateFolderModal,
  setIsOpenDeleteFolderModal,
}: Props) => {
  console.log("selected = ", selectedFolder);

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

      <Box
        sx={{
          display: "flex",
          gap: 1,
          fontSize: 16,
        }}
      >
        <Typography
          sx={{ fontWeight: 600 }}
        >
          写真数:
        </Typography>
        <Typography>
          {selectedFolder.total_photo_count}
        </Typography>
      </Box>

      <Box>
        <Typography
          sx={{
            mb: 1,
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          トータル画像サイズ
        </Typography>

        <Typography
          sx={{
            fontSize: 15,
            letterSpacing: "1px"
          }}
        >
          {formatFileSize(selectedFolder.total_photo_size)}
        </Typography>
      </Box>

      <ButtonList
        setIsOpenUpdateFolderModal={setIsOpenUpdateFolderModal}
        setIsOpenDeleteFolderModal={setIsOpenDeleteFolderModal}
      />
    </Box>
  )
}
