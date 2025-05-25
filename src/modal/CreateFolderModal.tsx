import { useForm } from "react-hook-form";
import { useCreateFolder } from "@/apis/useCreateFolder";
import { Modal, TextField } from "@mui/material"
import { ModalInner } from "@/modal/ModalInner";

type Props = {
  open: boolean;
  onClose: () => void;
  currentPath: number;
}

type FormValues = {
  folderName: string;
  description: string;
};

export const CreateFolderModal = ({ open, onClose, currentPath }: Props) => {
  const { mutate } = useCreateFolder({ currentFolderId: currentPath });

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    mutate({
      name: data.folderName,
      description: data.description || "",
      parent_id: currentPath,
    });
    onClose();
    reset();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalInner
        modalTitle="フォルダーを作成する"
        onSubmit={handleSubmit(onSubmit)}
        onClose={onClose}
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
          label="説明 (任意)"
          {...register("description")}
          margin="normal"
        />

      </ModalInner>
    </Modal>
  );
};
