import { useSnackbar } from "@/context/SnackBarContext";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

export function Upload({ currentFolderId }: { currentFolderId: number }) {
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const { showSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No JWT token found in localStorage");
    }

    try {
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
          title: "test_hogehoge",
          folder_id: currentFolderId,
          description: "description",
        }),
      });

      if (!saveRes.ok) throw new Error("Failed to save photo info to DB");

      setUploadedUrl(public_url);
      showSnackbar("画像のアップロードに成功しました");

      queryClient.invalidateQueries({ queryKey: ['file', currentFolderId] });
    } catch (err) {
      console.error("Error uploading:", err);
      alert("アップロードに失敗しました");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} disabled={uploading} />
      {uploading && <p>アップロード中...</p>}
      {uploadedUrl && (
        <div>
          <p>アップロード成功！画像URL:</p>
          <a href={uploadedUrl} target="_blank" rel="noopener noreferrer">
            {uploadedUrl}
          </a>
          <br />
          <img src={uploadedUrl} alt="Uploaded" style={{ maxWidth: "300px", marginTop: "10px" }} />
        </div>
      )}
    </div>
  );
}
