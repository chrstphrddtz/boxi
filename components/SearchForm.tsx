import styled from "styled-components";
import { StyledButton } from "./StyledButton";

const FormContainer = styled.form`
  display: grid;
  gap: 0.5rem;
  width: 20rem;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: inherit;
  border: 1px solid black;
  background-color: #f3e8d7;
  border-radius: 0.3rem;
  font-size: 1rem;
`;

export default function SearchForm({ onSubmit, formName, onClick }: any) {
  function handleSubmit(event: any) {
    event.preventDefault();
    onSubmit(event);
  }

  return (
    <FormContainer aria-labelledby={formName} onSubmit={handleSubmit}>
      <Label htmlFor="location">Location</Label>
      <Input
        required
        id="location"
        name="location"
        type="text"
        defaultValue="Berlin"
      />

      {/* <Label htmlFor="date">Availability</Label>
      <Input
        required
        id="date"
        name="date"
        type="date"
        // defaultValue={}
      /> */}

      {/* <Label htmlFor="price">Price</Label>
      <Input
        id="price"
        name="price"
        type="range"
        // defaultValue={}
      /> */}

      <StyledButton type="submit" onClick={onClick}>
        Search
      </StyledButton>
    </FormContainer>
  );
}
