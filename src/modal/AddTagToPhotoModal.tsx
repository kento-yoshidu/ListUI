import { useAddTagToPhoto } from "@/apis/useAddTagToPhoto";
import { useGetTags } from "@/apis/useGetTags";
import { Box, Button, Chip, Modal, Typography } from "@mui/material"
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { File } from "@/type/type";

type Props = {
  open: boolean;
  onClose: () => void;
  currentPath: number;
  selectedFiles: File[];
  setSelectedFile: Dispatch<SetStateAction<File[]>>;
};

export const AddTagToPhotoModal = ({
  open,
  onClose,
  currentPath,
  selectedFiles,
  setSelectedFile,
}: Props) => {
  const { mutate } = useAddTagToPhoto({
    currentPath,
    selectedFile: selectedFiles,
    setSelectedFile,
  });
  const { handleSubmit } = useForm();
  const { data: allTags } = useGetTags();

  // 初期選択タグを取得
  const initialSelectedTagIds = Array.from(
    new Set(
      selectedFiles.flatMap((photo) =>
        photo.tags.map((t: { tag: string }) => {
          const matched = allTags?.data.find((tag) => tag.tag === t.tag);

          return matched?.id;
        }).filter((id): id is number => id !== undefined)
      )
    )
  );

  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);

  // モーダル開くたびに初期化
  useEffect(() => {
    if (open && allTags) {
      setSelectedTagIds(initialSelectedTagIds);
    }
  }, [open, allTags]);

  const toggleTag = (id: number) => {
    setSelectedTagIds((prev) =>
      prev.includes(id) ? prev.filter((tagId) => tagId !== id) : [...prev, id]
    );
  };

  const onSubmit = () => {
    const photoIds = selectedFiles.map((file) => file.id);

    mutate({
      photo_ids: photoIds,
      tag_ids: selectedTagIds,
    });

    onClose();
    setSelectedFile([]);
  };

  if (!allTags) {
    return <p>loading...</p>;
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          position: "absolute" as const,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "30%",
          bgcolor: "background.paper",
          borderRadius: 1,
          p: 5,
        }}
      >
        <Typography
          variant="h6"
          mb={2}
        >
          タグ編集
        </Typography>

        <Typography>タグの付け外しができます</Typography>

        <Button
          variant="text"
          color="secondary"
          onClick={() => setSelectedTagIds([])}
          size="small"
        >
          全てのタグを外す
        </Button>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            mt: 2,
            mb: 6,
          }}
        >
          {allTags.data.map((tag) => (
            <Chip
              key={tag.id}
              label={tag.tag}
              color={selectedTagIds.includes(tag.id) ? "primary" : "default"}
              onClick={() => toggleTag(tag.id)}
              clickable
            />
          ))}
        </Box>

        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button onClick={onClose} sx={{ mr: 1 }}>キャンセル</Button>
          <Button variant="contained" type="submit">OK</Button>
        </Box>
      </Box>
    </Modal>
  );
};
