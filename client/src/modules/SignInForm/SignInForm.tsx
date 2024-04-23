import React from "react";
import Container from "../../components/Container";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSignInMutation } from "../../api/auth/authApi";
import { useAuth } from "../../hooks/useAuth";
import WithoutAccount from "./WithoutAccount";

type SignInFormFields = {
  login: string;
  password: string;
};

const SignInForm = () => {
  const navigate = useNavigate();
  const { authorize } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormFields>();

  const [triggerSignIn, { isLoading }] = useSignInMutation();

  const onSubmit = (data: SignInFormFields) => {
    triggerSignIn(data)
      .unwrap()
      .then((res) => {
        authorize(res.token);
        navigate("/");
      })
      .catch((err) => alert(err.data.message));
  };

  const isDisabledButton = isLoading || isSubmitting;

  return (
    <Container>
      <form className="w-[500px] mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="mb-14 text-center">Login</h1>
        <div className="mb-4 flex flex-col gap-4">
          <TextField
            {...register("login", { required: "Login is required" })}
            error={errors.login?.message}
            placeholder="Login"
          />
          <TextField
            {...register("password", { required: "Password is required" })}
            error={errors.password?.message}
            placeholder="Password"
            type="password"
          />
        </div>
        <WithoutAccount />
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            size="small"
            disabled={isDisabledButton}
          >
            Sign In
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default SignInForm;
