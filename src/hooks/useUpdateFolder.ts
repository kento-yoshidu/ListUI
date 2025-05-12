import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "@/context/SnackBarContext";
import { Folder } from "@/components/Table";

type Props = {
  name: string;
  description: string;
  folder_id: number;
};

export const useUpdateFolder = ({
  currentFolderId,
  onSuccess,
}: {
  currentFolderId: number;
  onSuccess: (updated: Folder) => void;
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: async ({
      name,
      description,
      folder_id,
    }: Props) => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token");

      const res = await fetch(`${baseUrl}/update-folder`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          folder_id,
        }),
      });

      const updatedFolder: Folder = await res.json();
      return updatedFolder;
    },
    onSuccess: (updatedFolder) => {
      queryClient.invalidateQueries({ queryKey: ["file", currentFolderId] });
      showSnackbar("フォルダーを作成しました");
      onSuccess(updatedFolder);
    },
    onError: (err: any) => {
      console.error("削除エラー:", err);
      showSnackbar("画像削除に失敗しました");
    },
  });
};

