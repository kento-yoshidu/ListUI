import { useEffect, type Dispatch, type SetStateAction } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useUpdateFolder } from "@/apis/useUpdateFolder";
import { useForm } from "react-hook-form";
import type { Folder } from "@/type/type";

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

type Props = {
  open: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  currentPath: number;
  selectedFolder: Folder;
  setSelectedFolder: Dispatch<SetStateAction<Folder[]>>;
}

export const UpdateFolderModal = ({
  open,
  onClose,
  currentPath,
  selectedFolder,
  setSelectedFolder,
}: Props) => {
  const { mutate } = useUpdateFolder({
    currentFolderId: currentPath,
    onSuccess: (res) => {
      const folder: Folder = {
        id: res.id,
        name: res.name,
        description: res.description,
      };

      setSelectedFolder([folder]);
      onClose(false);
    }
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    defaultValues: {
      folderName: "",
      description: "",
    },
  });

  useEffect(() => {
    if (open && selectedFolder) {
      reset({
        folderName: selectedFolder.name,
        description: selectedFolder.description || '',
      });
    }
  }, [open, selectedFolder, reset]);

  const onSubmit = (data: FormValues) => {
    mutate({
      name: data.folderName,
      description: data.description || "",
      folder_id: selectedFolder.id,
    });
  };

  return (
    <Modal open={open} onClose={() => onClose(false)}>
      <Box sx={style} component="form" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6" mb={2}>フォルダーを更新する</Typography>

        <TextField
          fullWidth
          label="フォルダー名"
          {...register("folderName", { required: "フォルダー名は必須です" })}
          error={!!errors.folderName}
          helperText={errors.folderName?.message}
          margin="normal"
        />

        <TextField
          fullWidth
          label="説明"
          {...register("description")}
          margin="normal"
        />

        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button onClick={() => onClose(false)} sx={{ mr: 1 }}>キャンセル</Button>
          <Button variant="contained" type="submit">OK</Button>
        </Box>
      </Box>
    </Modal>
  );
};
