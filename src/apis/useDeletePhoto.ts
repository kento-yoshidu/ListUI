import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "@/context/SnackBarContext";
import { Dispatch, SetStateAction } from "react";
import { File } from "@/type/type";

type Props = {
  setSelectedFile: Dispatch<SetStateAction<File[]>>;
};

export const useDeletePhoto = ({ setSelectedFile }: Props) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: async (id: number) => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token");

      const res = await fetch(`${baseUrl}/delete-photo`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([id]),
      });

      console.log("res = ", res);
      if (!res.ok) throw new Error(await res.text());
      return res;
    },
    onSuccess: () => {
      setSelectedFile([]);
      showSnackbar("画像削除に成功しました");
    },
    onError: (err: any) => {
      console.error("削除エラー:", err);
      showSnackbar("画像削除に失敗しました");
    },
  });
};
