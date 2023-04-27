import styled from "styled-components";
import { StyledButton } from "./StyledButton";

const FormContainer = styled.form`
  display: grid;
  gap: 0.5rem;
  width: 20rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  @media (max-width: 390px) {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 15rem;
  }
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

export default function EditProfileForm({
  formName,
  onSubmit,
  defaultData,
}: any) {
  function handleSubmit(event: any) {
    event.preventDefault();
    onSubmit(event);
  }

  return (
    <FormContainer aria-labelledby={formName} onSubmit={handleSubmit}>
      <Wrapper>
        <Label htmlFor="firstName">First Name: </Label>
        <Input
          id="firstName"
          name="firstName"
          type="text"
          defaultValue={defaultData?.firstName}
          required
        />
        <Label htmlFor="lastName">Last Name: </Label>
        <Input
          id="lastName"
          name="lastName"
          type="text"
          defaultValue={defaultData?.lastName}
          required
        />
      </Wrapper>

      <Label htmlFor="email">Email: </Label>
      <Input
        id="email"
        name="email"
        type="email"
        defaultValue={defaultData?.email}
        required
      />

      <Label htmlFor="location">Address: </Label>
      <Input
        id="location"
        name="location"
        type="text"
        defaultValue={defaultData?.location}
        required
      />

      <Label htmlFor="image">Profile Picture: </Label>
      <Input
        id="image"
        name="image"
        type="text"
        defaultValue={defaultData?.image}
        required
      />

      <Label htmlFor="price">Offer Price: </Label>
      <Input
        id="price"
        name="price"
        type="text"
        defaultValue={defaultData?.price}
      />

      <Label htmlFor="description">Description:</Label>
      <TextArea
        id="description"
        name="description"
        rows={5}
        defaultValue={defaultData?.description}
      ></TextArea>

      <StyledButton type="submit">Submit</StyledButton>
    </FormContainer>
  );
}
