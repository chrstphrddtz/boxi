import { useRouter } from "next/router";
import useSWR from "swr";
import { useState } from "react";
import styled from "styled-components";

const SearchContainer = styled.article`


`


export default function Search() {
  const [user, setUser] = useState("");
  const router = useRouter();
  const { isReady } = router;
  const { data, isLoading, error } = useSWR("/api/users", { fallbackData: [] });
  console.log("From Search: ", data);
  

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;
  // Search should include: 
  // Input for Availability (date/calendar)
  // Input for Location
  // Input for Price (Slider)
  // Search Button 
  // Should redirect the user to /results 
  // in /results the user will see only the filtered items

  return (
    <SearchContainer>
      <h1>Search!!</h1>
    </SearchContainer>
  )

}