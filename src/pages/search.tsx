import { useRouter } from "next/router";
import useSWR from "swr";
import { useState } from "react";
import styled from "styled-components";

import Form from "../../components/ContactForm";

const SearchContainer = styled.article`


`


export default function Search() {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const { isReady } = router;
  const { data, isLoading, error } = useSWR("/api/users", { fallbackData: [] });
  
  console.log("Data from Search: ", data);
  console.log("Query from Search: ", query);
  
  

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;
  // Search should include: 
  // Input for Availability (date/calendar)
  // Input for Location
  // Input for Price (Slider)
  // Search Button 
  // Should redirect the user to /results 

  // ?? next.js search using query string
  // in /results the user will see only the filtered items
  // https://medium.com/@ryanmambou/search-filter-in-nextjs-b30381c96f06
  // https://betterprogramming.pub/creating-a-multi-filter-function-to-filter-out-multiple-attributes-javascript-react-rails-5aad8e272142

  function searchFilter(userData: any) {
    const filterByLocation = userData.filter((element: any) => {
      element.location.toLowerCase().includes(query)
    })

  }


  return (
    <SearchContainer>
      <h1>Search!!</h1>
      <Form></Form>
    </SearchContainer>
  )

}