import type { Dispatch, SetStateAction } from "react";
import { ButtonList } from "./ButtonList";
import { Box, Chip, Typography } from "@mui/material";
import { formatFileSize } from "@/utils/photo";
import EditIcon from '@mui/icons-material/Edit';
import type { File } from "@/type/type";

type Props = {
  currentFolderId: number;
  selectedFile: File;
  setIsOpenUpdatePhotoModal: Dispatch<SetStateAction<boolean>>;
  setIsOpenDeletePhotoModal: Dispatch<SetStateAction<boolean>>;
  setIsOpenAddTagToPhotoModal: Dispatch<SetStateAction<boolean>>;
};

export const SinglePhoto = ({
  selectedFile,
  currentFolderId,
  setIsOpenUpdatePhotoModal,
  setIsOpenDeletePhotoModal,
  setIsOpenAddTagToPhotoModal,
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
          fontSize: 20,
          fontWeight: 600,
        }}
      >
        {selectedFile.name}
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
            fontSize: 16,
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

      <Box
        sx={{
          display: "flex",
          gap: 1,
          fontSize: 16,
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
          }}
        >
          画像サイズ:
        </Typography>

        <Typography
          sx={{
            letterSpacing: "1px"
          }}
        >
          {formatFileSize(selectedFile.size_in_bytes)}
        </Typography>
      </Box>

      <Box>
        <Box
          sx={{
            display: "flex",
            gap: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            タグ一覧
          </Typography>
          <EditIcon
            sx={{
              color: "gray",
              cursor: "pointer",
              "&:hover": {
                color: "#3f51b5",
              }
            }}
            onClick={() => setIsOpenAddTagToPhotoModal(true)}
          />
        </Box>

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
        setIsOpenUpdatePhotoModal={setIsOpenUpdatePhotoModal}
        setIsOpenDeletePhotoModal={setIsOpenDeletePhotoModal}
      />
    </Box>
  )
}
