import { useRouter } from "next/router";
import useSWR from "swr";
import { useState } from "react";

import styled from "styled-components";
import UserList from "../../components/UserList";
import OfferView from "../../components/OfferView";
import SearchForm from "../../components/Forms/SearchFormResultPage";

const MainContainer = styled.div`
  height: 95vh;
  display: grid;
  gap: 0.5rem;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 0.25fr 3fr;
  position: fixed;
  @media (max-width: 979px) {
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  /* @media (max-width: 844px) {
    display: flex;
    flex-direction: column;
    gap: 0;
  } */
`;

const SearchContainer = styled.div`
  grid-column-start: 1;
  grid-column-end: span 2;
  gap: 0.5rem;
  width: auto;
  @media (max-width: 1087px) {
    margin-top: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid var(--secondaryColor);
  }
  @media (max-width: 589px) {
    /* display: none; */
  }
`;

const ListContainer = styled.div`
  grid-area: 2 / 1;
  margin: -0.9rem 0;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 1087px) {
    margin: 0;
  }
`;

const OfferContainer = styled.div`
  grid-area: 2 / 2;
  margin-bottom: 1rem;
  overflow-x: hidden;
  border-left: 2px solid var(--secondaryColor);
  ::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 979px) {
    margin-bottom: 0;
    border-top: 2px solid var(--secondaryColor);
    border-left: none;
    z-index: 10;
    height: 60rem;
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

  function handleSearch(element: any) {
    let location = element.target.location.value;
    let startDate = element.target.date1.value;
    let endDate = element.target.date2.value;
    let minPrice = element.target.price1.value;
    let maxPrice = element.target.price2.value;

    router.push(
      `/results?location=${location}&startDate=${startDate}&endDate=${endDate}&minPrice=${minPrice}&maxPrice=${maxPrice}`
      // `/results?location=${location}&minPrice=${minPrice}&maxPrice=${maxPrice}`
    );
  }

  return (
    <>
      <MainContainer>
        <SearchContainer>
          <SearchForm
            onSubmit={handleSearch}
            formName={"SearchForm"}
            data={data}
          />
        </SearchContainer>
        <ListContainer>
          <UserList data={search(data)} handleClick={handleClick} />
        </ListContainer>
        <OfferContainer>
          <OfferView data={data} filteredUser={user} />
        </OfferContainer>
      </MainContainer>
    </>
  );
}
