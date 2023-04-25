import styled from "styled-components";
import { useState } from "react";
import { StyledButton } from "./StyledButton";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FormContainer = styled.form`
  display: grid;
  gap: 0.5rem;
  width: 20rem;
`;

const Label = styled.label`
  font-weight: bold;
`;

const DatePickerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
`;

const StyledDatePicker = styled(DatePicker)`
  padding: 0.5rem;
  font-size: inherit;
  border: 1px solid black;
  background-color: #f3e8d7;
  border-radius: 0.3rem;
  font-size: 1rem;
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

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date: any) => {
    setStartDate(date);    
  };

  const handleEndDateChange = (date: any) => {
    setEndDate(date);
  };

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

      <Label htmlFor="date">Availability</Label>
      <DatePickerWrapper>
        <StyledDatePicker
          id="date1"
          name="date"
          // required
          selected={startDate}
          onChange={handleStartDateChange}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Start Date"
        />
        <StyledDatePicker
          id="date2"
          name="date"
          // required
          selected={endDate}
          onChange={handleEndDateChange}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          placeholderText="End Date"
        />
      </DatePickerWrapper>

      <Label htmlFor="price">Price</Label>
      <Input
        id="price"
        name="price"
        type="text"
        // defaultValue={}
      />
      <Input
        id="price"
        name="price"
        type="text"
        // defaultValue={}
      />

      <StyledButton type="submit" onClick={onClick}>
        Search
      </StyledButton>
    </FormContainer>
  );
}
