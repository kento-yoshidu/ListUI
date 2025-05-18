import { Dispatch, SetStateAction } from "react";
import { Box } from "@mui/material"
import { useDeletePhoto } from "@/hooks/useDeletePhoto";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

type Props = {
  photoId: number;
  currentFolderId: number;
  setIsOpenUpdateFolderModal?: Dispatch<SetStateAction<boolean>>;
  setIsOpenUpdatePhotoModal?: Dispatch<SetStateAction<boolean>>;
};

export const ButtonList = ({
  photoId,
  currentFolderId,
  setIsOpenUpdateFolderModal,
  setIsOpenUpdatePhotoModal,
}: Props) => {
  const { mutate } = useDeletePhoto({
    currentFolderId
  });

  const handleClick = async () => {
    mutate(photoId);
  }

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        alignItems: "center",
        color: "gray",
        "& svg": {
          fontSize: 28,
          cursor: "pointer",
          transition: "color 0.2s",
          "&:hover": {
            color: "#3f51b5",
          },
        },
      }}
    >
      {setIsOpenUpdatePhotoModal && (
        <EditIcon onClick={() => setIsOpenUpdatePhotoModal(true)} />
      )}
      {setIsOpenUpdateFolderModal && (
        <EditIcon onClick={() => setIsOpenUpdateFolderModal(true)} />
      )}
      <DeleteIcon onClick={handleClick} />
    </Box>
  )
}
