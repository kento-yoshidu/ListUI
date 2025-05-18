import { useQuery } from "@tanstack/react-query";

type Tag = {
  id: number;
  tag: string;
};

type TagResponse = {
  data: Tag[];
};

const fetchData = async(): Promise<TagResponse> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;

  const url = `${baseUrl}/tags`;

  const token = localStorage.getItem("token");

  if (!token || token.trim() === "") {
    throw new Error("No JWT token found in localStorage");
  }

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    }
  });

  return res.json();
}

export const useGetTags = () => {
  return useQuery<TagResponse>({
    queryKey: ["tags"],
    queryFn: () => fetchData(),
  });
};
