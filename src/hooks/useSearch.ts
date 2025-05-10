import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useSnackbar } from "@/context/SnackBarContext";
import { API_PATH } from "@/constants";

// export const useSearch = () => {
//   const queryClient = useQueryClient();
//   const { showSnackbar } = useSnackbar();

//   return useMutation({
//     mutationFn: async (id: number) => {
//       const token = localStorage.getItem("token");
//       if (!token) throw new Error("No token");

//       const res = await fetch(`http://localhost:8000/${API_PATH.SEARCH}`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       console.log("res = ", await res.json());

//       if (!res.ok) throw new Error(await res.text());
//       return res;
//     },
//     onSuccess: () => {
//       // queryClient.invalidateQueries({ queryKey: ['file', currentFolderId] });
//       showSnackbar("画像削除に成功しました");
//     },
//     onError: (err: any) => {
//       console.error("削除エラー:", err);
//       showSnackbar("画像削除に失敗しました");
//     }
//   });
// };

const fetchData = async () => {
  const url = `http://localhost:8000/${API_PATH.SEARCH}`;

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
  })
}