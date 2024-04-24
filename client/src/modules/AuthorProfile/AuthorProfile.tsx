import React from "react";
import Container from "../../components/Container";
import { useGetProfileQuery } from "../../api/profilesApi/profilesApi";
import { useParams } from "react-router";

const AuthorProfile = () => {
  const { profileId } = useParams();

  const { data, isLoading, error } = useGetProfileQuery(profileId as string);

  if (isLoading) {
    return (
      <Container>
        <div>Loading...</div>
      </Container>
    );
  }

  return (
    <section className="pt-20 pb-25 bg-notebook-100">
      <Container>
        <div className="flex gap-[30px]">
          <img
            className="min-w-[526px] min-h-[515px]"
            src="https://avatarfiles.alphacoders.com/114/114650.jpg"
            alt="avatar user"
          />
          <div className="pt-[35px] pr-20">
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
