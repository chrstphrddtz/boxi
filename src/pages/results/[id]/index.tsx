import { useRouter } from "next/router";
import useSWR from 'swr';
import styled from "styled-components";



export default function OfferView() {
  const router = useRouter()
  const { isReady, push } = router
  const { id } = router.query

  const { data: user, isLoading, error } = useSWR('api/users', {fallbackData: []})

  if (!isReady || isLoading || error) return <h2>Loading...</h2>

}