import type { Dispatch, SetStateAction } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useDeleteFolder } from "@/apis/useDeleteFolder";
import type { Folder } from "@/type/type";

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
  selectedFolder: Folder[];
  setSelectedFolder: Dispatch<SetStateAction<Folder[]>>;
  photoCount: number;
}

export const DeleteFolderModal = ({
  open,
  onClose,
  currentPath,
  selectedFolder,
  setSelectedFolder,
  photoCount,
}: Props) => {
  const { mutate } = useDeleteFolder({
    currentFolderId: currentPath,
    setSelectedFolder,
  })

  const photoIds = selectedFolder.map((file) => {
    return file.id;
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    mutate(photoIds);
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style} component="form" onSubmit={handleSubmit}>
        <Typography variant="h6" mb={2}>フォルダーを削除する</Typography>

        <Typography>{photoCount}枚の写真が削除されます。</Typography>

        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button onClick={onClose} sx={{ mr: 1 }}>キャンセル</Button>
          <Button variant="contained" type="submit">OK</Button>
        </Box>
      </Box>
    </Modal>
  );
};
