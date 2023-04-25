import styled from "styled-components";
import { useState } from "react";
import { StyledButton } from "./StyledButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CurrencyInput from "react-currency-input-field";

const FormContainer = styled.form`
  display: grid;
  gap: 0.5rem;
  width: 20rem;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Wrapper = styled.div`
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

const StyledCurrencyInput = styled(CurrencyInput)`
  padding: 0.5rem;
  font-size: inherit;
  border: 1px solid black;
  background-color: #f3e8d7;
  border-radius: 0.3rem;
  font-size: 1rem;
`;

export default function SearchForm({ onSubmit, formName, onClick }: any) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  function handleSubmit(event: any) {
    event.preventDefault();
    onSubmit(event);
  }

  function handleStartDateChange(date: any) {
    setStartDate(date);
  }

  function handleEndDateChange(date: any) {
    setEndDate(date);
  }

  const prefix = "€";

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
      <Wrapper>
        <StyledDatePicker
          id="date1"
          name="date"
          required
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
          required
          selected={endDate}
          onChange={handleEndDateChange}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          placeholderText="End Date"
        />
      </Wrapper>

      <Label htmlFor="price">Price</Label>
      <Wrapper>
        <StyledCurrencyInput
          id="price"
          name="price1"
          decimalsLimit={2}
          prefix={prefix}
        />
        <StyledCurrencyInput
          id="price"
          name="price2"
          decimalsLimit={2}
          prefix={prefix}
        />
      </Wrapper>

      <StyledButton type="submit" onClick={onClick}>
        Search
      </StyledButton>
    </FormContainer>
  );
}
