import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import styled from "styled-components";

import SearchForm from "../../components/SearchForm";


const SearchContainer = styled.article``;

export default function Search() {
  const [searchLocation, setSearchLocation] = useState("")
  const router = useRouter();
  const { isReady } = router;
  const { data, isLoading, error } = useSWR("/api/users", { fallbackData: [] });
  if (!isReady || isLoading || error) return <h2>Loading...</h2>;
   // Search should include: 
  // Input for Availability (date/calendar)
  // Input for Price (Slider)

  // ?? next.js search using query string
  // in /results the user will see only the filtered items
  // https://medium.com/@ryanmambou/search-filter-in-nextjs-b30381c96f06
  // https://betterprogramming.pub/creating-a-multi-filter-function-to-filter-out-multiple-attributes-javascript-react-rails-5aad8e272142

  function searchFilter(userData: any) {    
    const filterByLocation = userData.filter((element: any) => element.location.toLowerCase().includes(searchLocation.toLowerCase()))    
    return filterByLocation
  }

  const results = searchFilter(data)
  console.log(results);
  

  function handleSearch(element: any) {
    setSearchLocation(element.target.location.value)

  }

  return (
    <SearchContainer>
      <h1>Search!!</h1>
      <SearchForm
        onSubmit={handleSearch}
        formName={"SearchForm"}
        // onClick={() => router.push("/results")}
      ></SearchForm>
    </SearchContainer>
  );
}
