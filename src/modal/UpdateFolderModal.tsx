import { useEffect, type Dispatch, type SetStateAction } from "react";
import { Modal, TextField } from "@mui/material";
import { useUpdateFolder } from "@/apis/useUpdateFolder";
import { useForm } from "react-hook-form";
import { ModalInner } from "./ModalInner";
import type { Folder } from "@/type/type";

type FormValues = {
  folderName: string;
  description: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
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
    onSuccess: ({ data }) => {
      const folder: Folder = {
        id: data.id,
        name: data.name,
        description: data.description,
        total_photo_count: selectedFolder.total_photo_count,
        total_photo_size: selectedFolder.total_photo_size,
      };

      setSelectedFolder([folder]);
      onClose();
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
    <Modal open={open} onClose={onClose}>
      <ModalInner
        onSubmit={handleSubmit(onSubmit)}
        onClose={onClose}
        modalTitle="フォルダーを更新する"
      >
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
      </ModalInner>
    </Modal>
  );
};
