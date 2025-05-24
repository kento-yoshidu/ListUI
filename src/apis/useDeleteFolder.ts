import type { Dispatch, SetStateAction } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "@/context/SnackBarContext";
import { API_ENDPOINTS } from "@/constants";
import type { Folder } from "@/type/type";

type Props = {
  currentFolderId: number;
  setSelectedFolder: Dispatch<SetStateAction<Folder[]>>;
};

export const useDeleteFolder = ({
  currentFolderId,
  setSelectedFolder,
}: Props) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: async (folderIds: number[]) => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token");

      const { path, method } = API_ENDPOINTS.DELETE_FOLDER;

      const res = await fetch(`${baseUrl}/${path}`, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ids: folderIds,
        }),
      });

      return await res.json();
    },
    onSuccess: async (res) => {
      queryClient.invalidateQueries({ queryKey: ["file", currentFolderId] });
      setSelectedFolder([]);
      showSnackbar(res.message);
    },
    onError: (err: any) => {
      console.error("削除エラー:", err);
      showSnackbar("画像削除に失敗しました");
    },
  });
};
