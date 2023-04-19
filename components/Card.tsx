import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";


const Article = styled.article`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  border: 2px solid black;
  border-radius: 10px;
  padding: 5px;
  margin: 10px;
`

const ImageContainer = styled.div`
  border: 1px solid black;
  border-radius: 5px;

`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 5px;
`

const UserInfo = styled.p`
  font-size: 1.5rem;
`

export default function Card({name, image, location, price, description, id}: any) {
  
  // Container: 
  // left side: 
  // Image
  
  // right side: 
  // Name
  // Location
  // Price
  // Short Description

  return (
    <Article>
      <ImageContainer>
        Placeholder for Image
      </ImageContainer>
      <TextContainer>
      <UserInfo>{name}</UserInfo>
      <UserInfo>{location}</UserInfo>
      <UserInfo>{price}</UserInfo>
      <UserInfo>description</UserInfo>
      </TextContainer>
    </Article>
  )
}