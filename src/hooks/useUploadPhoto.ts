import { useSnackbar } from "@/context/SnackBarContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

type Props = {
  file: File;
  title: string;
  description: string;
};

export const useUploadPhoto = (
  { currentFolderId }:
  { currentFolderId: number}
) => {
  const [uploading, setUploading] = useState(false);

  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const baseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;

  return useMutation({
    mutationFn: async ({
      file,
      title,
      description,
    }: Props) => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token");

      // 署名付きURLの取得
      const presignRes = await fetch("http://localhost:8000/generate-presigned-url", {
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

      // レコード追加
      const saveRes = await fetch("http://localhost:8000/register-photo", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image_path: public_url,
          title: title,
          folder_id: currentFolderId,
          description: description,
        }),
      });

      if (!saveRes.ok) throw new Error("Failed to save photo info to DB");

      showSnackbar("画像のアップロードに成功しました");

      queryClient.invalidateQueries({ queryKey: ['file', currentFolderId] });
      console.log("file = ", file);
    }
  })
}
