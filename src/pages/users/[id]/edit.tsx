import { useRouter } from "next/router";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import EditProfileForm from "../../../../components/EditProfileForm";
import styled from "styled-components";

const Article = styled.article`
  padding: 10rem;
  display: grid;
  align-items: center;
  justify-content: center;
  /* grid-template-rows: 1fr; */
  margin: 1rem;
`;

export default function EditProfile() {
  const router = useRouter();
  const { isReady, push } = router;
  const { id } = router.query;
  const { data: user, isLoading, error } = useSWR(`/api/users/${id}`);
  console.log("ID: ", id);

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

    await trigger(userData);
    push("/profile");
  }

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;
  if (isMutating) {
    return <h1>Submitting your changes</h1>;
  }

  return (
    <Article>
      <EditProfileForm
        onSubmit={handleEditUser}
        formName={"edit-profile"}
        defaultData={user}
      />
    </Article>
  );
}
