import { useQuery } from "@tanstack/react-query";

const fetchData = async (id: number) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;

  const url = `${baseUrl}/files/${id}`;

  const token = localStorage.getItem("token");

  if (!token || token.trim() === "") {
    redirectToSignin();
    throw new Error("No JWT token found in localStorage");
  }

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    }
  });

  if (res.status === 401 || res.status === 403) {
    redirectToSignin();
    throw new Error("Unauthorized");
  }

  if (!res.ok) {
    throw new Error('Network response was not ok');
  }

  return res.json();
};

const redirectToSignin = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("rootFolder");
  window.location.href = "/signin";
};

export const useGetFiles = (id: number) => {
  return useQuery({
    queryKey: ['file', id],
    queryFn: () => fetchData(id),
  });
};
