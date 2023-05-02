import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import styled from "styled-components";

import { useUser } from "@auth0/nextjs-auth0/client";
import ProfileView from "../../../components/ProfileView";

const RedirectDiv = styled.div`
  display: grid;
  align-content: center;
  justify-content: center;
  width: 60%;
  margin: auto;
`;

const RedirectTitle = styled.h2`
  font-size: 2rem;
  margin-top: 3rem;
`;

export default function Profile() {
  const { data } = useSWR("/api/users", { fallbackData: [] });
  const router = useRouter();
  const { push } = router;
  const [redirectSeconds, setRedirectSeconds] = useState<number>(5);

  const { user, error, isLoading } = useUser();

  useEffect(() => {
    if (user === undefined) {
      if (redirectSeconds === 0) {
        push("/api/auth/signup");
        return;
      }
    }
    setTimeout(() => {
      console.log(redirectSeconds);
      setRedirectSeconds((redirectSeconds) => redirectSeconds - 1);
    }, 1000);
  }, [user, push, redirectSeconds]);

  if (isLoading) return <div>Loading...</div>;
  if (user === undefined)
    return (
      <RedirectDiv>
        <RedirectTitle>
          You don&apos;t have a profile yet. You will be redirected to the
          Signup page in {redirectSeconds} seconds ...
        </RedirectTitle>
      </RedirectDiv>
    );
  if (error) return <div>{error.message}</div>;

  const findUser = data.find((userInDB: any) => {
    return userInDB.email === user.email;
  });

  console.log("User from DB: ", findUser);

  return user && <ProfileView user={findUser} />;
}
