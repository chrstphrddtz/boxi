import styled from "styled-components";
import { useState } from "react";
import { StyledButton } from "./StyledButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CurrencyInput from "react-currency-input-field";

const FormContainer = styled.form`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  @media (max-width: 390px) {
    gap: 0.5rem;
    width: 15rem;
  }
`;

const Label = styled.label`
  font-weight: bold;
  @media (max-width: 390px) {
    margin-top: 1rem;
  }
`;

// const Wrapper = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   gap: 0.5rem;
//   @media (max-width: 390px) {
//     display: flex;
//     flex-direction: column;
//     gap: 0.5rem;
//     width: 15rem;
//   }
// `;

const StyledDatePicker = styled(DatePicker)`
  padding: 0.5rem;
  font-size: inherit;
  border: 1px solid black;
  background-color: #f3e8d7;
  border-radius: 0.3rem;
  font-size: 1rem;
  max-width: 6.5rem;
  @media (max-width: 390px) {
    width: 15rem;
  }
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: inherit;
  border: 1px solid black;
  background-color: #f3e8d7;
  border-radius: 0.3rem;
  font-size: 1rem;
  max-width: 6.5rem;
  @media (max-width: 390px) {
    width: 15rem;
  }
`;

const StyledCurrencyInput = styled(CurrencyInput)`
  padding: 0.5rem;
  font-size: inherit;
  border: 1px solid black;
  background-color: #f3e8d7;
  border-radius: 0.3rem;
  font-size: 1rem;
  max-width: 6.5rem;
  &:focus {
  }
  @media (max-width: 390px) {
    width: 15rem;
  }
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
      {/* <Wrapper> */}
      <Label htmlFor="location"></Label>
      <Input
        required
        id="location"
        name="location"
        type="text"
        defaultValue="Berlin"
      />

      <Label htmlFor="date"></Label>
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

      <Label htmlFor="price"></Label>

      <StyledCurrencyInput
        id="price"
        name="price1"
        decimalsLimit={2}
        prefix={prefix}
        placeholder="min Price"
      />
      <StyledCurrencyInput
        id="price"
        name="price2"
        decimalsLimit={2}
        prefix={prefix}
        placeholder="max Price"
      />
      <StyledButton type="submit" onClick={onClick}>
        Search
      </StyledButton>
      {/* </Wrapper> */}
    </FormContainer>
  );
}
