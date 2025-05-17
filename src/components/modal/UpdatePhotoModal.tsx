import { useUpdateFolder } from "@/hooks/useUpdateFolder";
import { Box, Button, Modal, TextField, Typography } from "@mui/material"
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { File, Folder } from "../Table";
import { ClassNames } from "@emotion/react";
import { useUpdatePhoto } from "@/hooks/useUpdatePhoto";

type FormValues = {
  fileName: string;
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
  onClose: Dispatch<SetStateAction<boolean>>;
  currentPath: number;
  selectedFile: File;
  setSelectedFile: Dispatch<SetStateAction<File[]>>;
}

export const UpdatePhotoModal = ({
  open,
  onClose,
  currentPath,
  selectedFile,
  setSelectedFile,
}: Props) => {
  const { mutate } = useUpdatePhoto({
    currentFolderId: currentPath,
    onSuccess: (res) => {
      console.log("res = ", res);

      const file: File = {
        id: res.id,
        title: res.title,
        description: res.description,
        image_path: selectedFile.image_path,
        tags: selectedFile.tags,
      };

      setSelectedFile([file]);
      onClose(false);
    }
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    defaultValues: {
      fileName: "",
      description: "",
    },
  });

  // useEffect(() => {
  //   if (open && selectedFolder) {
  //     reset({
  //       folderName: selectedFolder.name,
  //       description: selectedFolder.description || '',
  //     });
  //   }
  // }, [open, selectedFolder, reset]);

  const onSubmit = (data: FormValues) => {
    mutate({
      title: data.fileName,
      description: data.description || "",
      id: selectedFile.id,
    });
  };

  return (
    <Modal
      open={open}
      onClose={() => onClose(false)}
    >
      <Box
        sx={style}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography variant="h6" mb={2}>Update Photo</Typography>

        <TextField
          fullWidth
          label="Photo Name"
          {...register("fileName", { required: "フォルダー名は必須です" })}
          error={!!errors.fileName}
          helperText={errors.fileName?.message}
          margin="normal"
        />

        <TextField
          fullWidth
          label="説明 (任意)"
          {...register("description")}
          margin="normal"
        />

        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button onClick={() => onClose(false)} sx={{ mr: 1 }}>キャンセル</Button>
          <Button variant="contained" type="submit">OK</Button>
        </Box>
      </Box>
    </Modal>
  )
}


