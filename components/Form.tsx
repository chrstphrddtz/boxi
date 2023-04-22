import { useRouter } from "next/router";
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
  border: 3px solid black;
  border-radius: 0.5rem;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  font-family: inherit;
  border: 3px solid black;
  border-radius: 0.5rem;
  padding: 0.5rem;

  font-size: 1rem;
`;

export default function Form({ onSubmit, formName }: any) {
  const router = useRouter();
  function handleSubmit(event: any) {
    event.preventDefault();
    onSubmit(event);
  }

  return (
    <FormContainer aria-labelledby={formName} onSubmit={handleSubmit}>
      <Label htmlFor="name">Name</Label>
      <Input
        required
        id="name"
        name="name"
        type="text"
        // defaultValue={}
      />

      <Label htmlFor="email">Email</Label>
      <Input
        required
        autoComplete="email"
        id="email"
        name="email"
        type="email"
        // defaultValue={}
      />

      <Label htmlFor="message">Message</Label>
      <TextArea
        required
        id="message"
        name="message"
        rows={5}
        // defaultValue={}
        
      ></TextArea>

      <StyledButton type="submit">
        Submit
      </StyledButton>
    </FormContainer>
  );
}