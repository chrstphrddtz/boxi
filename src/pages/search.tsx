import { useRouter } from "next/router";
import useSWR from "swr";
import styled from "styled-components";

import SearchForm from "../../components/SearchForm";

const SearchContainer = styled.article`
  display: grid;
  align
`;

export default function Search() {
  // const [searchLocation, setSearchLocation] = useState("")
  const router = useRouter();
  const { isReady } = router;
  const { data, isLoading, error } = useSWR("/api/users", { fallbackData: [] });
  if (!isReady || isLoading || error) return <h2>Loading...</h2>;
  

  function handleSearch(element: any) {
    let location = element.target.location.value
    let startDate = element.target.date1.value
    let endDate = element.target.date2.value
    let minPrice = element.target.price1.value
    let maxPrice = element.target.price1.value
    console.log("Price Target", minPrice);
    
    router.push(`/results?location=${location}&startDate=${startDate}&endDate=${endDate}&minPrice=${minPrice}&maxPrice=${maxPrice}`)
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
