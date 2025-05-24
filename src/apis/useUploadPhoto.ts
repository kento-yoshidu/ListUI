import { API_ENDPOINTS } from "@/constants";
import { useSnackbar } from "@/context/SnackBarContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  file: File;
  name: string;
  description: string;
};

export const useUploadPhoto = (
  { currentFolderId }:
  { currentFolderId: number }
) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;
  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      file,
      name,
      description,
    }: Props) => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token");

      // 署名付きURLの取得
      const presignRes = await fetch(`${baseUrl}/generate-presigned-url`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filename: file.name }),
      });

      if (!presignRes.ok) throw new Error("Failed to get presigned URL");

      const { presigned_url, public_url } = await presignRes.json();

      const uploadRes = await fetch(presigned_url, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      if (!uploadRes.ok) throw new Error("Upload failed");

      const { path, method } = API_ENDPOINTS.UPLOAD_PHOTO;

      // レコード追加
      const res = await fetch(`${baseUrl}/${path}`, {
        method: method,
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image_path: public_url,
          name: name,
          folder_id: currentFolderId,
          description: description,
        }),
      });

      return await res.json();
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["file", currentFolderId] });
      showSnackbar(res.message);
    },
    onError: (err: any) => {
      console.error("アップロードエラー:", err);
      showSnackbar("画像のアップロードに失敗しました。");
    }
  })
}
