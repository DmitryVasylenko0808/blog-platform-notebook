import React, { useEffect } from "react";
import Button from "../../components/Button";
import Container from "../../components/Container";
import TextField from "../../components/TextField";
import TextArea from "../../components/TextArea";
import { useAuth } from "../../hooks/useAuth";
import {
  useEditProfileMutation,
  useLazyGetProfileQuery,
} from "../../api/profilesApi/profilesApi";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

type EditProfileFormFields = {
  firstName: string;
  secondName: string;
  description: string;
};

const EditProfileForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [triggerGetProfile, { data, isLoading }] = useLazyGetProfileQuery();
  const [triggerEditProfile, { isLoading: isUpdatingProfile }] =
    useEditProfileMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EditProfileFormFields>({
    values: {
      firstName: data?.firstName ?? "",
      secondName: data?.secondName ?? "",
      description: data?.description ?? "",
    },
  });

  useEffect(() => {
    if (user) {
      triggerGetProfile(user.id.toString())
        .unwrap()
        .catch((err) => alert(err.data.message));
    }
  }, []);

  const submitHandler = (data: EditProfileFormFields) => {
    triggerEditProfile(data)
      .unwrap()
      .then(() => {
        alert("Profile is successfully edited");
        navigate(`/profile/${user?.id}`);
      })
      .catch((err) => alert(err.data.message));
  };

  const isDisabledButton = isUpdatingProfile || isSubmitting;

  if (isLoading) {
    <section className="py-20">
      <div>Loading...</div>
    </section>;
  }

  return (
    <section className="py-20">
      <Container>
        <form
          className="w-[500px] mx-auto"
          onSubmit={handleSubmit(submitHandler)}
        >
          <h1 className="mb-14 text-center">Edit Profile</h1>
          <div className="mb-4 flex flex-col gap-4">
            <div className="flex gap-5">
              <TextField
                {...register("firstName", {
                  required: "First name is required",
                })}
                placeholder="First name"
                error={errors.firstName?.message}
              />
              <TextField
                {...register("secondName", {
                  required: "Second name is required",
                })}
                placeholder="Second name"
                error={errors.secondName?.message}
              />
            </div>
            <TextArea
              {...register("description")}
              rows={5}
              placeholder="Description"
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              variant="primary"
              size="small"
              disabled={isDisabledButton}
            >
              Edit Profile
            </Button>
          </div>
        </form>
      </Container>
    </section>
  );
};

export default EditProfileForm;
