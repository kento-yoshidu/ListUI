import { useSnackbar } from "@/context/SnackBarContext";
import { useLogin } from "@/hooks/useLogin";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { showSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const loginMutation = useLogin({
    onSuccess: () => {
      showSnackbar("ログイン成功", "success");
    },
    onError: () => {
      showSnackbar("ログイン失敗", "error");
    },
  });


  const onSubmit = (data: FormData) => {
    loginMutation.mutate(data);
  };

  return (
    <>
      <Container maxWidth="sm">
        <Backdrop
          open={loginMutation.isPending}
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.modal + 1 }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
          <Typography variant="h5" gutterBottom>
            サインイン
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
          >
            <TextField
              label="Email"
              type="email"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                  message: "Invalid email address",
                },
              })}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register("password", { required: "Password is required" })}
            />

            <Button type="submit" variant="contained" color="primary">
              送信
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default SignIn;
