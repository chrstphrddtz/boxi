import { useUser } from "@auth0/nextjs-auth0/client";
import useSWR from "swr";

import ProfileView from "../../../components/ProfileView";

export default function Profile() {
  const { data } = useSWR("/api/users", { fallbackData: [] });
  const { user, error, isLoading } = useUser();

  if (isLoading || user === undefined) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const findUser = data.find((userInDB: any) => {
    return userInDB.email === user.email;
  });
  console.log("findUser", findUser);

  return user && <ProfileView user={findUser} />;
}
