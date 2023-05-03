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
  position: fixed;
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

  const location: any = query.location;
  const dateRangeStart = new Date(query.startDate as any).getTime();
  const dateRangeEnd = new Date(query.endDate as any).getTime();
  const priceRange: any = {
    min: query.minPrice,
    max: query.maxPrice,
  };

  function search(newData: any) {
    if (!location) return "";
    if (priceRange.min === "") priceRange.min = 0;
    if (priceRange.max === "") priceRange.max = 1000;

    const filter = newData
      .filter(
        (element: any) => element.active === true || element.active === "true"
      )
      .filter((element: any) =>
        element.location.toLowerCase().includes(location.toLowerCase())
      )
      .filter(
        (element: any) =>
          element.price <= priceRange.max && element.price >= priceRange.min
      )
      .filter((element: any) => {
        const availabilityStart = new Date(
          element.availability.start
        ).getTime();
        const availabilityEnd = new Date(element.availability.end).getTime();

        if (
          dateRangeStart < availabilityStart &&
          dateRangeEnd < availabilityStart
        )
          return false;
        if (dateRangeStart > availabilityEnd && dateRangeEnd > availabilityEnd)
          return false;
        if (
          dateRangeStart < availabilityStart &&
          dateRangeEnd >= availabilityStart
        )
          return true;
        if (
          dateRangeStart >= availabilityStart &&
          dateRangeEnd >= availabilityStart
        )
          return true;
      });
    return filter;
  }

  return (
    <>
      {/* <SearchContainer>
    <SearchForm onSubmit={handleSearch} formName={"SearchForm"} data={data} />
    </SearchContainer> */}
      <MainContainer>
        <ListContainer>
          <UserList data={search(data)} handleClick={handleClick} />
        </ListContainer>
        <OfferContainer>
          <OfferView filteredUser={user} />
        </OfferContainer>
      </MainContainer>
    </>
  );
}
