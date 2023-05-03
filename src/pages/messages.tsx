import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0/client";
import styled from "styled-components";

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

export default function Messages() {
  const [redirectSeconds, setRedirectSeconds] = useState<number>(5);
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  const { push } = router;

  useEffect(() => {
    if (user === undefined) {
      if (redirectSeconds === 0) {
        push("/api/auth/signup");
        return;
      }
      setTimeout(() => {
        console.log(redirectSeconds);
        setRedirectSeconds((redirectSeconds) => redirectSeconds - 1);
      }, 1000);
    }
  }, [user, push, redirectSeconds]);

  if (isLoading) return <div>Getting User Data...</div>;
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

  return (
    <>
      <h2>Messages</h2>
    </>
  );
}
