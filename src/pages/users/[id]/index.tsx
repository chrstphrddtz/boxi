import { useRouter } from "next/router.js";
import useSWR from "swr";

export default function ContactUser() {
  const router = useRouter();
  const { isReady, push } = router;
  const { id } = router.query;
  const { data, isLoading, error } = useSWR(`/api/users/${id}`);

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  // console.log(data);

  return (
    <>
      <h1>Placeholder !! </h1>
      {/* <Form/> */}
    </>
  );
}
