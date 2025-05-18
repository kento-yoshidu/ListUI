import { API_PATH } from "@/constants";
import { useSnackbar } from "@/context/SnackBarContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  id: number;
  name: string;
  description: string;
};

type PhotoResponse = {
  message: string;
  data: {
    id: number;
    name: string;
    description: string;
  };
};

export const useUpdatePhoto = ({
  currentFolderId,
  onSuccess,
}: {
  currentFolderId: number;
  onSuccess: (updated: PhotoResponse) => void;
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: async ({
      id,
      name,
      description,
    }: Props) => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token");

      const res = await fetch(`${baseUrl}/${API_PATH.UPDATE_PHOTO}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name,
          description,
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
}
