import { useLogin } from "@/hooks/useLogin"

const SignIn = () => {
  const loginMutation = useLogin();

  const handleSubmit = () => {
    loginMutation.mutate({
      email: "email@email.com",
      password: "password",
    })
  };

  return (
    <>
      <p>
        signin
      </p>

      <button
        onClick={handleSubmit}
      >
        submit
      </button>
    </>
  )
}

export default SignIn;
