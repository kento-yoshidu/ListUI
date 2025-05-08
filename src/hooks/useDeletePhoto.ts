import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useSnackbar } from "@/context/SnackBarContext";

export const useDeletePhoto = ({ currentFolderId }: { currentFolderId: number }) => {
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: async (id: number) => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token");

      const res = await fetch("http://localhost:8000/delete-photo", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([id]),
      });

      if (!res.ok) throw new Error(await res.text());
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['file', currentFolderId] });
      showSnackbar("画像削除に成功しました");
    },
    onError: (err: any) => {
      console.error("削除エラー:", err);
      showSnackbar("画像削除に失敗しました");
    }
  });
};
