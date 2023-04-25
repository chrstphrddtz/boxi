import { useRouter } from "next/router";
import useSWR from "swr";
import styled from "styled-components";

import SearchForm from "../../components/SearchForm";

const SearchContainer = styled.article``;

export default function Search() {
  // const [searchLocation, setSearchLocation] = useState("")
  const router = useRouter();
  const { isReady } = router;
  const { data, isLoading, error } = useSWR("/api/users", { fallbackData: [] });
  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  function handleSearch(element: any) {
    // setSearchLocation(element.target.location.value)
    // window.location.replace("/results?chefka=rossie&location=" + element.target.location.value)
    let location = element.target.location.value
    router.push(`/results?location=${location}`)
  }

  return (
    <SearchContainer>
      <h1>Search!!</h1>
      <SearchForm
        onSubmit={handleSearch}
        formName={"SearchForm"}
        // onClick={() => router.push("/results?location=" + searchLocation)}
      ></SearchForm>
    </SearchContainer>
  );
}
