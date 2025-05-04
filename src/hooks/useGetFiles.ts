import { useQuery } from "@tanstack/react-query";

const fetchData = async (id: number) => {
  const url = `http://localhost:8000/files/${id}`;

  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No JWT token found in localStorage");
  }

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    }
  });

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
