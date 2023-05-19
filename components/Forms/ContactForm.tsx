import { useUser } from "@auth0/nextjs-auth0/client";
import useSWR from "swr";

import styled from "styled-components";
import { StyledButton } from "../StyledElements/StyledButton";

const FormContainer = styled.form`
  display: grid;
  gap: 0.5rem;
  width: 20rem;
`;

const Label = styled.label`
  font-weight: bold;
  font-size: 1.5rem;
`;

const TextArea = styled.textarea`
  font-family: inherit;
  border: 1px solid black;
  border-radius: 0.3rem;
  padding: 0.5rem;
  font-size: 1rem;
  &:focus {
    box-shadow: 0px 8px 30px -8px;
  }
  @media (max-width: 979px) {
    font-size: 1.5rem;
  }
`;

export default function ContactForm({ formName, data, filteredUser }: any) {
  const { user } = useUser();
  const messages = useSWR("/api/messages");

  function handleSubmit(event: any) {
    event.preventDefault();
    handleContactUser(event);
  }

  const findCurrentUser = data.find((userInDB: any) => {
    return userInDB.email === user?.email;
  });

  async function handleContactUser(event: any) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const messageData = Object.fromEntries(formData);
    const messagetoStore = {
      ...messageData,
      name: findCurrentUser.firstName,
      sender: findCurrentUser.user_id,
      receiver: filteredUser.user_id || filteredUser.sender,
      timestamp: Date(),
      isRead: false,
    };

    const response = await fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messagetoStore),
    });

    if (response.ok) {
      messages.mutate();
      event.target.reset();
    } else {
      console.error(response.status);
    }
  }

  return (
    <FormContainer aria-labelledby={formName} onSubmit={handleSubmit}>
      <Label htmlFor="message">Contact</Label>
      <TextArea required id="message" name="message" rows={5}></TextArea>
      <StyledButton type="submit">Submit</StyledButton>
    </FormContainer>
  );
}
