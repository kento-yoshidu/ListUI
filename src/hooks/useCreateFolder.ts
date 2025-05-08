import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useSnackbar } from "@/context/SnackBarContext";

type Props = {
  name: string;
  description: string;
  parent_id: number;
};

export const useCreateFolder = ({ currentFolderId }: { currentFolderId: number}) => {
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: async ({
      name,
      description,
      parent_id,
    }: Props) => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token");

      await fetch("http://localhost:8000/create-folder", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          parent_id,
        }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['file', currentFolderId] });
      showSnackbar("フォルダーを作成しました");
    },
    onError: (err: any) => {
      console.error("削除エラー:", err);
      showSnackbar("画像削除に失敗しました");
    }
  })
};
