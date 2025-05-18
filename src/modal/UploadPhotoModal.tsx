import { useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useUploadPhoto } from "@/apis/useUploadPhoto";
import { useForm } from "react-hook-form";

type Props = {
  open: boolean;
  onClose: () => void;
  currentPath: number;
};

type FormValues = {
  name: string;
  description: string;
};

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export const UploadPhotoModal = ({ open, onClose, currentPath }: Props) => {
  const [file, setFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const { mutate: uploadPhoto, isPending } = useUploadPhoto({
    currentFolderId: currentPath,
  });

  const onSubmit = (data: FormValues) => {
    if (!file) {
      alert("ファイルを選択してください");
      return;
    }

    uploadPhoto(
      {
        file,
        name: data.name,
        description: data.description,
      },
      {
        onSuccess: () => {
          onClose();
          reset();
          setFile(null);
        },
      },
    );
  };


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];

    if (selected) {
      setFile(selected);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style} component="form" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6" mb={2}>写真をアップロードする</Typography>

        <TextField
          fullWidth
          label="ファイル名"
          {...register("name", { required: "ファイル名は必須です。" })}
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

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isPending}
          style={{ marginTop: 16 }}
        />
        {isPending && <Typography mt={1}>アップロード中...</Typography>}

        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button
            onClick={() => {
              onClose();
              reset();
              setFile(null);
            }}
            sx={{ mr: 1, textTransform: "none" }}
          >
            Cancel
          </Button>
          <Button variant="contained" type="submit" disabled={isPending || !file}>
            OK
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
