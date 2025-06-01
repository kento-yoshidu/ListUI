import { useSnackbar } from "@/context/SnackBarContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  ids: number[];
  folder_id: number;
};

export const useMovePhoto = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: async({
      ids,
      folder_id,
    }: Props) => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token");

      const res = await fetch(`${baseUrl}/photos/move`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ids,
          folder_id,
        }),
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["file"] });
      showSnackbar("ファイルを移動しました");
    }
  })
}