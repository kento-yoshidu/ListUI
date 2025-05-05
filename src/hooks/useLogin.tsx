import { useAuth } from "@/context/AuthProvider";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

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

export const useLogin = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (error: any) => void;
}) => {
  const router = useRouter();

  const { setToken } = useAuth();

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setToken(data.token);
      onSuccess?.();
      setTimeout(() => {
        router.push("/files");
      }, 50);
    },
    onError: (error: any) => {
      onError?.(error);
    },
  });
}
