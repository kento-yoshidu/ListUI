import { useCreateFolder } from "@/hooks/useCreateFolder";
import { Box, Button, Modal, TextField, Typography } from "@mui/material"
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";

type Props = {
  open: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  currentPath: number;
}

type FormValues = {
  folderName: string;
  description: string;
};

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

export const UploadPhotoModal = ({ open, onClose, currentPath }: Props) => {
  const { mutate } = useCreateFolder({ currentFolderId: currentPath });

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    mutate({
      name: data.folderName,
      description: data.description || "",
      parent_id: currentPath,
    })
  };

  return (
    <Modal open={open} onClose={() => onClose(false)}>
      <Box sx={style} component="form" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6" mb={2}>Upload Photo</Typography>

        <TextField
          fullWidth
          label="File Name"
          {...register("folderName", { required: "File Name is required." })}
          error={!!errors.folderName}
          helperText={errors.folderName?.message}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Description"
          {...register("description")}
          margin="normal"
        />

        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button
            onClick={() => onClose(false)}
            sx={{
              mr: 1,
              textTransform: "none",
            }}
          >
            Cancel
          </Button>
          <Button variant="contained" type="submit">OK</Button>
        </Box>
      </Box>
    </Modal>
  )
}
