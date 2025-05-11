import { useQuery } from "@tanstack/react-query";
import { API_PATH } from "@/constants";

const fetchData = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;
  const url = `${baseUrl}/${API_PATH.SEARCH}`;

  const token = localStorage.getItem("token");

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    }
  });

  if (res.status === 401 || res.status === 403) {
    // redirectToSignin();
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    throw new Error('Network response was not ok');
  }

  return res.json();
};

export const useSearch = () => {
  return useQuery({
    queryKey: ["search"],
    queryFn: () => fetchData(),
  });
};
