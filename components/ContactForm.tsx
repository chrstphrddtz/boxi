import { useUser } from "@auth0/nextjs-auth0/client";
import useSWR from "swr";

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

const TextArea = styled.textarea`
  font-family: inherit;
  border: 1px solid black;
  border-radius: 0.3rem;
  background-color: #f3e8d7;
  padding: 0.5rem;
  font-size: 1rem;
`;

export default function ContactForm({
  onSubmit,
  formName,
  defaultData,
  onChange,
}: // data,
// filteredUser
any) {
  // const { user } = useUser();
  // const messages = useSWR("/api/messages");

  function handleSubmit(event: any) {
    event.preventDefault();
    onSubmit(event);
  }

  // const findCurrentUser = data.find((userInDB: any) => {
  //   return userInDB.email === user?.email;
  // });

  // async function handleContactUser(event: any) {
  //   event.preventDefault();

  //   const formData = new FormData(event.target);
  //   const messageData = Object.fromEntries(formData);
  //   const messagetoStore = {
  //     ...messageData,
  //     sender: findCurrentUser.user_id,
  //     receiver: filteredUser.user_id,
  //     timestamp: Date(),
  //     isRead: false,
  //   };

  //   const response = await fetch("/api/messages", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(messagetoStore),
  //   });

  //   if (response.ok) {
  //     messages.mutate();
  //     event.target.reset();
  //   } else {
  //     console.error(response.status);
  //   }
  // }

  return (
    <FormContainer aria-labelledby={formName} onSubmit={handleSubmit}>
      <Label htmlFor="name">Name</Label>
      <Input
        required
        id="name"
        name="name"
        type="text"
        defaultValue={defaultData.nickname}
        // onChange={onChange}
      />

      <Label htmlFor="message">Message</Label>
      <TextArea
        required
        id="message"
        name="message"
        rows={5}
        // defaultValue={}
      ></TextArea>

      <StyledButton type="submit">Submit</StyledButton>
    </FormContainer>
  );
}
