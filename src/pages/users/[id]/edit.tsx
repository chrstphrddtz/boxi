import { useRouter } from "next/router";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import EditProfileForm from "../../../../components/Forms/EditProfileForm";
import styled from "styled-components";

const Article = styled.article`
  padding-top: 2rem;
  /* padding: 10rem; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* grid-template-rows: 1fr; */
`;

const H2 = styled.h2`
  letter-spacing: 0.2rem;
  font-weight: 600;
  text-decoration: underline;
  margin: 0;
  margin-bottom: 2rem;
  /* @media (max-width: 979px) {
    text-decoration: none;
    border-bottom: 2px solid var(--secondaryColor);
  } */
`;

export default function EditProfile() {
  const router = useRouter();
  const { isReady, push } = router;
  const { id } = router.query;
  const { data: user, isLoading, error } = useSWR(`/api/users/${id}`);

  async function editUser(url: any, { arg }: any) {
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(arg),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      await response.json();
    } else {
      console.error(`Error: ${response.status}`);
    }
  }

  const { trigger, isMutating } = useSWRMutation(`/api/users/${id}`, editUser);

  async function handleEditUser(event: any) {
    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData);
    const active = event.target.active.checked;
    const newUserData = { ...userData, active };

    await trigger(newUserData as any);
    push("/profile");
  }

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;
  if (isMutating) {
    return <h1>Submitting your changes</h1>;
  }

  return (
    <Article>
      <H2>Edit Profile</H2>

      <EditProfileForm
        onSubmit={handleEditUser}
        formName={"edit-profile"}
        defaultData={user}
      />
    </Article>
  );
}
