import React from "react";
import Container from "../../components/Container";
import { useForm } from "react-hook-form";
import TextField from "../../components/TextField";
import HaveAccount from "./HaveAccount";
import Button from "../../components/Button";
import { useNavigate } from "react-router";
import { useSignUpMutation } from "../../api/auth/authApi";
import ImageFileSelect from "../../components/ImageFileSelect";

type SignUpFormFields = {
  login: string;
  password: string;
  passwordConfirmation: string;
  firstName: string;
  secondName: string;
  avatarFile?: FileList;
};

const SignUpForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm<SignUpFormFields>();

  const [triggerSignUp, { isLoading }] = useSignUpMutation();

  const submitHandler = (data: SignUpFormFields) => {
    const { passwordConfirmation, avatarFile, ...other } = data;

    const signUpData = avatarFile
      ? { avatarFile: avatarFile[0], ...other }
      : other;

    triggerSignUp(signUpData)
      .unwrap()
      .then(() => {
        alert("Registration is successfully completed");
        navigate("/sign-in");
      })
      .catch((err) => alert(err.data.message));
  };

  const isDisabledButton = formState.isSubmitting || isLoading;

  return (
    <Container>
      <form
        className="w-[500px] mx-auto"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-14 text-center">Registration</h1>
        <div className="mb-4 flex flex-col gap-4">
          <TextField
            {...register("login", {
              required: "Login is required",
              minLength: {
                value: 3,
                message: "Login must have at least 3 characters",
              },
            })}
            placeholder="Login"
            error={formState.errors.login?.message}
          />
          <TextField
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 4,
                message: "Password must have at least 4 characters",
              },
            })}
            placeholder="Password"
            type="password"
            error={formState.errors.password?.message}
          />
          <TextField
            {...register("passwordConfirmation", {
              validate: (value: string, formValues: SignUpFormFields) => {
                return value === formValues.password || "Passwords don't match";
              },
            })}
            placeholder="Confirm Password"
            type="password"
            error={formState.errors.passwordConfirmation?.message}
          />
          <div className="flex gap-5">
            <TextField
              {...register("firstName", { required: "First name is required" })}
              placeholder="First name"
              error={formState.errors.firstName?.message}
            />
            <TextField
              {...register("secondName", {
                required: "Second name is required",
              })}
              placeholder="Second name"
              error={formState.errors.secondName?.message}
            />
          </div>
          <ImageFileSelect {...register("avatarFile")} variant="avatar" />
          <HaveAccount />
          <div className="flex justify-end">
            <Button
              type="submit"
              variant="primary"
              size="small"
              disabled={isDisabledButton}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </form>
    </Container>
  );
};

export default SignUpForm;
