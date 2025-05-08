import { TextFormat } from "@mui/icons-material";
import { Box, Button, Modal, TextField, Typography } from "@mui/material"
import { Dispatch, SetStateAction } from "react";

type Props = {
  open: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
}

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

export const CreateFolderModal = ({ open, onClose }: Props) => {
  return (
    <Modal
      open={open}
    >
      <Box sx={style}>
        <Typography variant="h6" mb={2}>フォルダー作成</Typography>
        <TextField
          fullWidth
          label="フォルダー名"
          value="folder_name"
          // onChange={(e) => setFolderName(e.target.value)}
        />
        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button onClick={() => onClose(false)} sx={{ mr: 1 }}>キャンセル</Button>
          <Button variant="contained" onClick={() => console.log("foo")}>OK</Button>
        </Box>
      </Box>
    </Modal>
  )
}
