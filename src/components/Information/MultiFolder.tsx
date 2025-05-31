import type { Dispatch, SetStateAction } from "react";
import { ButtonList } from "./ButtonList";
import { Box, Typography } from "@mui/material";
import type { Folder } from "@/type/type";

type Props = {
  selectedFolder: Folder[];
  setIsOpenDeleteFolderModal: Dispatch<SetStateAction<boolean>>;
}

export const MultiFolder = ({
  selectedFolder,
  setIsOpenDeleteFolderModal,
}: Props) => {
  const photoCount = selectedFolder.reduce((sum, folder) => {
    return sum + folder.total_photo_count;
  }, 0);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Typography>
        {selectedFolder.length}つのフォルダーが選択されています
      </Typography>

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
          {photoCount}
        </Typography>
      </Box>

      <ButtonList
        setIsOpenDeleteFolderModal={setIsOpenDeleteFolderModal}
      />
    </Box>
  )
}

