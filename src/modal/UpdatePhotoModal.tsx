import { useEffect, type Dispatch, type SetStateAction } from "react";
import { Modal, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useUpdatePhoto } from "@/apis/useUpdatePhoto";
import { ModalInner } from "./ModalInner";
import type { File } from "@/type/type";

type FormValues = {
  name: string;
  description: string;
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
      const file: any = {
        id: res.data.id,
        name: res.data.name,
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
        name: selectedPhoto.name,
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
      <ModalInner
        onSubmit={handleSubmit(onSubmit)}
        onClose={onClose}
        modalTitle="写真を更新する"
      >
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
      </ModalInner>
    </Modal>
  );
};
