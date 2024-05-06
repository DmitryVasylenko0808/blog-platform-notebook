import React from "react";
import { useGetProfileQuery } from "../../api/profilesApi/profilesApi";
import { useParams } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { useImage } from "../../hooks/useImage";
import Container from "../../components/Container";
import { Link } from "react-router-dom";

const AuthorProfile = () => {
  const { profileId } = useParams();
  const { user } = useAuth();

  const { data, isLoading, error } = useGetProfileQuery(profileId as string);

  const avatarImageSrc = useImage("avatar", data?.avatarUrl);

  if (isLoading) {
    return (
      <Container>
        <div>Loading...</div>
      </Container>
    );
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
                <Link
                  to="/edit-profile"
                  className="px-[26px] py-[13px] bg-notebook-300 border border-notebook-300 rounded font-normal text-white"
                >
                  Edit Profile
                </Link>
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
