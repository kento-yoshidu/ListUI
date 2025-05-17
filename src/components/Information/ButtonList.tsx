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
    <Box>
      <DeleteIcon
        onClick={handleClick}
      />
      {setIsOpenUpdateFolderModal && (
        <EditIcon
          onClick={() => setIsOpenUpdateFolderModal(true)}
        />
      )}
      {setIsOpenUpdatePhotoModal && (
        <EditIcon
          onClick={() => setIsOpenUpdatePhotoModal(true)}
        />
      )}
    </Box>
  )
}
