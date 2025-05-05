import { useLogin } from "@/hooks/useLogin"
import { Box } from "@mui/material";
import { useState } from "react";
import { FormState, useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const loginMutation = useLogin();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    loginMutation.mutate({
      email: data.email,
      password: data.password,
    })
  };

  return (
    <>
      <p>
        signin
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <label>Email</label>
          <input
            type="email"
            {
              ...register(
                "email",
                {
                  required: "Email is Required",
                  pattern: {
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                    message: "Invalid email address",
                  },
                }
              )
            }
          />
        </Box>

        <div>
          <label>Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default SignIn;
