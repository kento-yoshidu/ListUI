import { Box } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeletePhoto } from "@/hooks/useDeletePhoto";

export const ButtonList = ({ photoId, currentFolderId }: { photoId: number; currentFolderId: number }) => {
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
    </Box>
  )
}
