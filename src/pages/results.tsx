import { useRouter } from "next/router";
import useSWR from "swr";
import { useState } from "react";

import styled from "styled-components";
import UserList from "../../components/UserList";
import OfferView from "../../components/OfferView";

// const SearchContainer = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: flex-end;
//   gap: 0.5rem;
//   width: auto;
// `;

const MainContainer = styled.div`
  height: 95vh;
  display: grid;
  gap: 0.5rem;
  grid-template-columns: 2fr 3fr;
  @media (max-width: 844px) {
    display: flex;
    flex-direction: column;
    gap: 0;
  }
`;

const ListContainer = styled.div`
  margin: -0.9rem auto;
  overflow-x: hidden;
  background-color: #f3e8d7;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const OfferContainer = styled.div`
  background-color: #E2AC55;
  margin-bottom: 1rem;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    display: none;
  };
  @media (max-width: 844px) {
    z-index: 10;
    width: 80%
    height: 100%;
    margin: auto;
    padding: 0 5rem;
  }
`;

export default function ResultView() {
  const [user, setUser] = useState("");
  const router = useRouter();
  const { query, isReady } = router;
  const { data, isLoading, error } = useSWR("/api/users", { fallbackData: [] });

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  function handleClick(newData: string) {
    const newUser = data.find((user: any) => user._id === newData);
    setUser(newUser);
  }

  // function handleSearch(element: any) {
  //   let location = element.target.location.value;
  //   let startDate = element.target.date1.value;
  //   let endDate = element.target.date2.value;
  //   let minPrice = element.target.price1.value;
  //   let maxPrice = element.target.price2.value;

  //   router.push(
  //     `/results?location=${location}&startDate=${startDate}&endDate=${endDate}&minPrice=${minPrice}&maxPrice=${maxPrice}`
  //   );
  // }

  const location: any = query.location;
  const priceRange: any = {
    min: query.minPrice,
    max: query.maxPrice,
  };
  const dateRange: any = {
    min: query.startDate,
    max: query.endDate,
  };

  function search(newData: any) {
    if (!location) return "";
    if (priceRange.min === "") priceRange.min = 0;
    if (priceRange.max === "") priceRange.max = 1000;

    console.log(newData);
    

    const filter = newData
      .filter((element: any) =>
        element.location.toLowerCase().includes(location.toLowerCase())
      )
      .filter((element: any) => {
        return (
          element.price <= priceRange.max && element.price >= priceRange.min
        );
      })
    // .filter((element: any) =>
    //   element.availability.start
    // );
    console.log("filter: ", filter);

    return filter;
  }

  const results = search(data);
  console.log("Results from /results", results);

  console.log("Query from /results", query);

  return (
    <>
      {/* <SearchContainer>
    <SearchForm onSubmit={handleSearch} formName={"SearchForm"} data={data} />
    </SearchContainer> */}
      <MainContainer>
        <ListContainer>
          <UserList data={results} handleClick={handleClick} />
        </ListContainer>
        <OfferContainer>
          <OfferView user={user} />
        </OfferContainer>
      </MainContainer>
    </>
  );
}
