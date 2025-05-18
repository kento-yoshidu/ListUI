import { useEffect, type Dispatch, type SetStateAction } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useUpdatePhoto } from "@/apis/useUpdatePhoto";
import type { File } from "@/type/type";

type FormValues = {
  name: string;
  description: string;
};

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
};

type Props = {
  open: boolean;
  onClose: () => void;
  currentPath: number;
  selectedPhoto: File;
  setSelectedPhoto: Dispatch<SetStateAction<File[]>>;
}

export const UpdatePhotoModal = ({
  open,
  onClose,
  currentPath,
  selectedPhoto,
  setSelectedPhoto,
}: Props) => {
  const { mutate } = useUpdatePhoto({
    currentFolderId: currentPath,
    onSuccess: (res) => {
      const file: File = {
        id: res.data.id,
        title: res.data.name,
        description: res.data.description,
        image_path: selectedPhoto.image_path,
        tags: selectedPhoto.tags,
      };

      onClose();
      setSelectedPhoto([file]);
    },
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (open && selectedPhoto) {
      reset({
        name: selectedPhoto.title,
        description: selectedPhoto.description || '',
      });
    }
  }, [open, selectedPhoto, reset]);

  const onSubmit = (data: FormValues) => {
    mutate({
      name: data.name,
      description: data.description || "",
      id: selectedPhoto.id,
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <Box
        sx={style}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography
          variant="h6"
          mb={2}
        >
          写真を更新する
        </Typography>

        <TextField
          fullWidth
          label="ファイル名"
          {...register("name", { required: "ファイル名は必須です" })}
          error={!!errors.name}
          helperText={errors.name?.message}
          margin="normal"
        />

        <TextField
          fullWidth
          label="説明"
          {...register("description")}
          margin="normal"
        />

        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button
            onClick={onClose}
            sx={{ mr: 1 }}
          >
            キャンセル
          </Button>
          <Button variant="contained" type="submit">OK</Button>
        </Box>
      </Box>
    </Modal>
  );
};
