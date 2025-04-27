import { useQuery } from "@tanstack/react-query";

const fetchData = async (id: number) => {
  console.log("発火");

  const url = `http://localhost:8000/files/${id}/1`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

export const useGetFiles = (id: number) => {
  return useQuery({
    queryKey: ['file', id],
    queryFn: () => fetchData(id),
  });
};
