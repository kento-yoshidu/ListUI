import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "@/context/SnackBarContext";
import { API_ENDPOINTS } from "@/constants";
import type { Folder } from "@/type/type";

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

      const { path, method } = API_ENDPOINTS.UPDATE_FOLDER;

      const res = await fetch(`${baseUrl}/${path}`, {
        method: method,
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

      return await res.json();
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["file", currentFolderId] });
      showSnackbar(res.message);
      onSuccess(res);
    },
    onError: (err: any) => {
      console.error("削除エラー:", err);
      showSnackbar("画像削除に失敗しました");
    },
  });
};

