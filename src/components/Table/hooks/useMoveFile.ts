import { useEffect, useState, type DragEvent } from "react"
import { useMovePhoto } from "@/apis/useMovePhoto";
import { File, Folder } from "@/type/type";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  selectedFile: File[];
};

export const useMoveFile = ({
  selectedFile,
}: Props) => {
  const [draggedFile, setDraggedFile] = useState<File | null>(null);
  const [dragPreviewEl, setDragPreviewEl] = useState<HTMLDivElement | null>(null);

  const { mutate } = useMovePhoto();

  const handleDragStart = (
    file: File,
  ) => {
    setDraggedFile(file);

    if (dragPreviewEl) {
      const isSelected = selectedFile.some((f) => f.id === file.id);
      const count = isSelected ? selectedFile.length : 1;

      dragPreviewEl.textContent = `${count} 件`;

      // 少し遅らせてから表示しないとマウス位置が取れないブラウザあり
      setTimeout(() => {
        dragPreviewEl.style.opacity = "1";
      }, 0);
    }
  };

  const handleDrop = (
    e: DragEvent<HTMLTableRowElement>,
    targetFolder: Folder
  ) => {
    e.preventDefault();

    if (!draggedFile) return;

    console.log("Dropped:", draggedFile.id, "→", targetFolder.id);

    const isSelected = selectedFile.some(
      (file) => file.id === draggedFile.id
    );

    const filesToMove = isSelected ? selectedFile : [draggedFile];

  const ids = filesToMove.map(f => f.id);
  const folder_id = targetFolder.id;

  // API呼び出し
  mutate(
    { ids, folder_id },
    {
      onSuccess: () => {
        // 成功時の処理（例: スナックバー表示やキャッシュ更新）
        // window.alert("success");
      },
      onError: (error) => {
        window.alert("error");
      }
    }
  );

    setDraggedFile(null);

    if (dragPreviewEl) dragPreviewEl.style.opacity = "0";
  };

  const handleDragEnd = () => {
    setDraggedFile(null);
    if (dragPreviewEl) dragPreviewEl.style.opacity = "0";
  };

  const handleDragOver = (e: DragEvent<HTMLTableRowElement>) => {
    e.preventDefault();
  };

  return {
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
  };
};

// useEffect(() => {
//   const preview = document.createElement("div");
//   preview.style.position = "fixed";
//   preview.style.zIndex = "9999";
//   preview.style.background = "black";
//   preview.style.color = "white";
//   preview.style.padding = "6px 12px";
//   preview.style.borderRadius = "16px";
//   preview.style.fontSize = "14px";
//   preview.style.pointerEvents = "none";
//   preview.style.transition = "opacity 0.2s";
//   preview.style.opacity = "0";
//   document.body.appendChild(preview);
//   setDragPreviewEl(preview);

//   const handleMouseMove = (e: MouseEvent) => {
//     if (preview.style.opacity === "1") {
//       preview.style.left = `${e.clientX + 10}px`;
//       preview.style.top = `${e.clientY + 10}px`;
//     }
//   };

//   document.addEventListener("mousemove", handleMouseMove);

//   return () => {
//     document.body.removeChild(preview);
//     document.removeEventListener("mousemove", handleMouseMove);
//   };
// }, []);
