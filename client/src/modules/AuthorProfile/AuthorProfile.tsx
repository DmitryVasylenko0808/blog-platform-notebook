import React from "react";
import { useGetProfileQuery } from "../../api/profilesApi/profilesApi";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { useImage } from "../../hooks/useImage";
import Container from "../../components/Container";
import { Link } from "react-router-dom";
import Button from "../../components/Button";

const AuthorProfile = () => {
  const { profileId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetProfileQuery(profileId as string);

  const avatarImageSrc = useImage("avatar", data?.avatarUrl);

  if (isLoading) {
    return (
      <Container>
        <div>Loading...</div>
      </Container>
    );
  }

  if (error) {
    alert("Oops... Something went wrong");
    navigate(-1);
  }

  const isUserProfile =
    profileId !== undefined &&
    profileId !== null &&
    parseFloat(profileId) === user?.id;

  return (
    <section className="pt-20 pb-25 bg-notebook-100">
      <Container>
        <div className="flex gap-[30px]">
          <img
            className="w-[526px] h-[515px] max-w-[526px] max-h-[515px]"
            src={avatarImageSrc}
            alt="avatar user"
          />
          <div className="flex-auto pt-[35px] pr-20">
            {isUserProfile && (
              <div className="mb-4 flex justify-end">
                <Button
                  variant="primary"
                  size="big"
                  as="link"
                  to="/edit-profile"
                >
                  Edit Profile
                </Button>
              </div>
            )}
            <h2 className="mb-6">
              {data?.firstName} {data?.secondName}
            </h2>
            <p>{data?.description}</p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AuthorProfile;
