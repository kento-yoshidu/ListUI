import { API_ENDPOINTS } from "@/constants";
import { useSnackbar } from "@/context/SnackBarContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";
import type { File } from "@/type/type";
import { useGetFiles } from "./useGetFiles";

type Props = {
  photo_ids: number[];
  tag_ids: number[];
};

export const useAddTagToPhoto = ({
  currentPath,
  selectedFile,
  setSelectedFile,
}: {
  currentPath: number;
  selectedFile: File[],
  setSelectedFile: Dispatch<SetStateAction<File[]>>;
}) => {
  const { refetch } = useGetFiles(currentPath);
  const baseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;
  const { showSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: async({
      photo_ids,
      tag_ids,
    }: Props) => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token");

      const { path, method } = API_ENDPOINTS.ADD_TAG_TO_PHOTO;

      const res = await fetch(`${baseUrl}/${path}`, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          photo_ids,
          tag_ids,
        }),
      });

      return await res.json();
    },
    onSuccess: async (res) => {
      showSnackbar(res.message);
      refetch();
    },
  });
};
