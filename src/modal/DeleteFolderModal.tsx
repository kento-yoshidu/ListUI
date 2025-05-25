import type { Dispatch, SetStateAction } from "react";
import { Modal, Typography } from "@mui/material";
import { useDeleteFolder } from "@/apis/useDeleteFolder";
import { ModalInner } from "./ModalInner";
import type { Folder } from "@/type/type";

type Props = {
  open: boolean;
  onClose: () => void;
  currentPath: number;
  selectedFolder: Folder[];
  setSelectedFolder: Dispatch<SetStateAction<Folder[]>>;
  photoCount: number;
}

export const DeleteFolderModal = ({
  open,
  onClose,
  currentPath,
  selectedFolder,
  setSelectedFolder,
  photoCount,
}: Props) => {
  const { mutate } = useDeleteFolder({
    currentFolderId: currentPath,
    setSelectedFolder,
  })

  const photoIds = selectedFolder.map((file) => {
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
        modalTitle="フォルダーを削除する"
      >
        <Typography>{photoCount}枚の写真が削除されます。</Typography>
      </ModalInner>
    </Modal>
  );
};
