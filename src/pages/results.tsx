import { useRouter } from "next/router";
import useSWR from "swr";
import { useState } from "react";

import styled from "styled-components";
import UserList from "../../components/UserList";
import OfferView from "../../components/OfferView";

const MainContainer = styled.div`
  /* gap: 2rem; */
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
  /* border-radius: 0.7rem; */
  /* margin-top: -1rem; */
  margin: -0.9rem auto;
  overflow-x: hidden;
  /* height: 100vh; */
  ::-webkit-scrollbar {
    display: none;
  }
`;

const OfferContainer = styled.div`
  background-color: #E2AC55;
  /* border: 2px solid black; */
  /* border-radius: 0.9rem; */
  margin-bottom: 1rem;
  /* margin-top: 1.5rem; */
  overflow-x: hidden;
  /* height: 100vh; */
  ::-webkit-scrollbar {
    display: none;
  }
`;

export default function ResultView() {
  const [user, setUser] = useState("");
  const router = useRouter();
  const { isReady } = router;
  const { data, isLoading, error } = useSWR("/api/users", { fallbackData: [] });

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  function handleClick(newData: string) {
    const newUser = data.find((user: any) => user._id === newData);
    setUser(newUser);
  }

  return (
    <MainContainer>
      <ListContainer>
        <UserList data={data} handleClick={handleClick} />
      </ListContainer>
      <OfferContainer>
        <OfferView user={user} />
      </OfferContainer>
    </MainContainer>
  );
}
