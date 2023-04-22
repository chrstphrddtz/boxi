import { useRouter } from "next/router";
import useSWR from "swr";
import { useState } from "react";

import styled from "styled-components";
import UserList from "../../components/UserList";
import OfferView from "../../components/OfferView";

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
  ::-webkit-scrollbar {
    display: none;
  };
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
    height: 150%;
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
