import type { Dispatch, SetStateAction } from "react";
import type { File } from "@/type/type";
import { useDeletePhoto } from "@/apis/useDeletePhoto";
import { Box, Button, Modal, Typography } from "@mui/material";

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

type Props = {
  open: boolean;
  onClose: () => void;
  currentPath: number;
  selectedFile: File[];
  setSelectedFile: Dispatch<SetStateAction<File[]>>;
}

export const DeletePhotoModal = ({
  open,
  onClose,
  currentPath,
  selectedFile,
  setSelectedFile,
}: Props) => {
  const { mutate } = useDeletePhoto({
    currentFolderId: currentPath,
    setSelectedFile,
  })

  const handleSubmit = (e: any) => {
    e.preventDefault();
    mutate(selectedFile[0].id);
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style} component="form" onSubmit={handleSubmit}>
        <Typography variant="h6" mb={2}>写真を削除する</Typography>

        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button onClick={onClose} sx={{ mr: 1 }}>キャンセル</Button>
          <Button variant="contained" type="submit">OK</Button>
        </Box>
      </Box>
    </Modal>
  );
};
