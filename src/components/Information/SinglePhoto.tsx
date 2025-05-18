import { Dispatch, SetStateAction } from "react";
import { ButtonList } from "./ButtonList";
import { Box, Chip, Typography } from "@mui/material";
import { File } from "@/type/type";

type Props = {
  currentFolderId: number;
  selectedFile: File;
  setIsOpenUpdatePhotoModal: Dispatch<SetStateAction<boolean>>;
}

export const SinglePhoto = ({
  selectedFile,
  currentFolderId,
  setIsOpenUpdatePhotoModal,
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
        {selectedFile.title}
      </Typography>

      <Box
        component="img"
        src={selectedFile.image_path}
        sx={{
          maxWidth: "100%",
          borderRadius: 2,
          boxShadow: 1,
        }}
      />

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
          {selectedFile.description}
        </Typography>
      </Box>

      <Box>
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          タグ一覧
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            mt: 1,
          }}
        >
          {selectedFile.tags.map((tag) => (
            <Chip key={tag.id} label={tag.tag} />
          ))}
        </Box>
      </Box>

      <ButtonList
        currentFolderId={currentFolderId}
        photoId={selectedFile.id}
        setIsOpenUpdatePhotoModal={setIsOpenUpdatePhotoModal}
      />
    </Box>
  )
}
