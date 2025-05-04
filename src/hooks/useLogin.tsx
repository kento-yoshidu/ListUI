import { useAuth } from "@/context/AuthProvider";
import { useMutation, useQuery } from "@tanstack/react-query";

type Props = {
  email: string;
  password: string;
};

const login = async ({ email, password }: Props) => {
  const url = `http://localhost:8000/signin`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify({ email, password }),
  });

  return res.json();
}

export const useLogin = () => {
  const { setToken } = useAuth();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setToken(data.token);
    },
    onError: (error: any) => {
      console.error("ログイン失敗:", error.message);
    },
  });
}
