/*
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
    </div>
  );
}
*/
