import type { Dispatch, SetStateAction } from "react";
import { useDeletePhoto } from "@/apis/useDeletePhoto";
import { Modal, Typography } from "@mui/material";
import { ModalInner } from "./ModalInner";
import type { File } from "@/type/type";

type Props = {
  open: boolean;
  onClose: () => void;
  currentPath: number;
  selectedFile: File[];
  setSelectedFile: Dispatch<SetStateAction<File[]>>;
}

export const DeletePhotoModal = ({
  open,
  onClose,
  currentPath,
  selectedFile,
  setSelectedFile,
}: Props) => {
  const { mutate } = useDeletePhoto({
    currentFolderId: currentPath,
    setSelectedFile,
  })

  const photoIds = selectedFile.map((file) => {
    return file.id;
  });

  const onSubmit = () => {
    mutate(photoIds);
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose}>
      <ModalInner
        onSubmit={onSubmit}
        onClose={onClose}
        modalTitle="写真を削除する"
      >
        <Typography>写真を削除してもいいですか？</Typography>
      </ModalInner>
    </Modal>
  );
};
