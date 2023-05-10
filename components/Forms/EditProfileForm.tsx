import { useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { StyledButton } from "../StyledElements/StyledButton";
import { StyledLink } from "../StyledElements/StyledLink";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FormContainer = styled.form`
  display: grid;
  gap: 0.5rem;
  @media (max-width: 499px) {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 15rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  @media (max-width: 499px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    width: 15rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  justify-content: space-around;
  @media (max-width: 499px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    width: 15rem;
  }
`;

const Label = styled.label`
  font-weight: bold;
`;

const H3 = styled.h2`
  font-weight: bold;
  padding-top: 1.5rem;
  margin-top: 1.5rem;
  margin-bottom: 0.2rem;
  text-decoration: underline;
  border-top: 2px solid var(--secondaryColor);
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: inherit;
  border: 1px solid black;
  background-color: inherit;
  border-radius: 0.3rem;
  font-size: 1rem;
  &:active {
    /* text-decoration: underline; */
    box-shadow: 0px 8px 30px -8px;
  };
`;

const StyledDatePicker = styled(DatePicker)`
  padding: 0.5rem;
  font-size: inherit;
  border: 1px solid black;
  background-color: inherit;
  border-radius: 0.3rem;
  font-size: 1rem;
  &:active {
    /* text-decoration: underline; */
    box-shadow: 0px 8px 30px -8px;
  };
  @media (max-width: 499px) {
    width: 15rem;
  }
`;

const TextArea = styled.textarea`
  font-family: inherit;
  border: 1px solid black;
  border-radius: 0.3rem;
  background-color: inherit;
  padding: 0.5rem;
  font-size: 1rem;
  &:active {
    /* text-decoration: underline; */
    box-shadow: 0px 8px 30px -8px;
  };
`;

export default function EditProfileForm({
  formName,
  onSubmit,
  defaultData,
}: any) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    function initialChecked() {
      if (defaultData.active === true) {
        setIsChecked(true);
        return;
      }
      setIsChecked(false);
    }
    initialChecked();
  }, [defaultData.active]);

  function handleChecked() {
    setIsChecked(!isChecked);
  }

  function handleStartDateChange(date: any) {
    setStartDate(date);
  }

  function handleEndDateChange(date: any) {
    setEndDate(date);
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    onSubmit(event);
  }

  return (
    <>
    <FormContainer aria-labelledby={formName} onSubmit={handleSubmit}>
      <Wrapper>
        <Label htmlFor="firstName">First Name</Label>
        <Input
          id="firstName"
          name="firstName"
          type="text"
          defaultValue={defaultData?.firstName}
          required
        />
        <Label htmlFor="lastName">Last Name</Label>
        <Input
          id="lastName"
          name="lastName"
          type="text"
          defaultValue={defaultData?.lastName}
          required
        />
      </Wrapper>

      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        name="email"
        type="email"
        defaultValue={defaultData?.email}
        required
      />

      <Label htmlFor="location">Address</Label>
      <Input
        id="location"
        name="location"
        type="text"
        defaultValue={defaultData?.location}
        required
      />

      <Label htmlFor="image">Profile Picture</Label>
      <Input
        id="image"
        name="image"
        type="text"
        defaultValue={defaultData?.image}
        required
      />

      <H3>Helper Profile</H3>
      <Label htmlFor="price">Offer Price</Label>
      <Input
        id="price"
        name="price"
        type="text"
        defaultValue={defaultData?.price}
      />

      <Wrapper>
        <Label htmlFor="active">Active</Label>
        <Input
          id="active"
          name="active"
          type="checkbox"
          checked={isChecked}
          onChange={handleChecked}
        />
      </Wrapper>

      <Wrapper>
        {/* https://reactdatepicker.com/#example-min-date */}
        <Label htmlFor="availability">Availability</Label>
        <StyledDatePicker
          id="availability.start"
          name="availability.start"
          required
          selected={startDate}
          onChange={handleStartDateChange}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText={defaultData?.availability.start}
          dateFormat={"yyyy/MM/dd"}
          // defaultValue={defaultData?.availability.start}
        />
        <StyledDatePicker
          id="availability.end"
          name="availability.end"
          required
          selected={endDate}
          onChange={handleEndDateChange}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          placeholderText={defaultData?.availability.end}
          dateFormat={"yyyy/MM/dd"}
          // defaultDate={defaultData?.availability.end}
        />
      </Wrapper>

      <Label htmlFor="description">Description</Label>
      <TextArea
        id="description"
        name="description"
        rows={5}
        defaultValue={defaultData?.description}
      ></TextArea>

      <ButtonWrapper>
        <StyledLink href={"/profile"}>Cancel</StyledLink>
        <StyledButton type="submit">Submit</StyledButton>
      </ButtonWrapper>
    </FormContainer>
    </>
  );
}
