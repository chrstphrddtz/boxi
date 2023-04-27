import { useRouter } from "next/router";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import Link from "next/link";
import { StyledLink } from "../../../components/StyledLink";

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
    if (!userData) await trigger(userData)
    push("/profile");
  }

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;
  if (isMutating) {
    return <h1>Submitting your changes</h1>;
  }

  return (
    <>
      <div>work in progres ...</div>

    </>
  );
}
