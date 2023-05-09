import styled from "styled-components";
import { useState } from "react";
import { StyledButton } from "../StyledElements/StyledButton";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CurrencyInput from "react-currency-input-field";

const FormContainer = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  gap: 0.5rem;
  @media (max-width: 1089px) {
    flex-wrap: wrap;
  }
  @media (max-width: 589px) {
    display: none;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: inherit;
  border: 2px solid var(--secondaryColor);
  background-color: var(--primaryColor);
  color: var(--secondaryColor);
  border-radius: 0.2rem;
  font-size: 1rem;
  &:focus {
    box-shadow: 0px 8px 30px -8px;
  }
  @media (max-width: 979px) {
    font-size: 1.2rem;
  }
`;

const StyledDatePicker = styled(DatePicker)`
  padding: 0.5rem;
  font-size: inherit;
  border: 2px solid var(--secondaryColor);
  background-color: var(--primaryColor);
  color: var(--secondaryColor);
  border-radius: 0.2rem;
  font-size: 1rem;
  &:focus {
    box-shadow: 0px 8px 30px -8px;
  }
  @media (max-width: 979px) {
    font-size: 1.2rem;
  }
`;

const StyledCurrencyInput = styled(CurrencyInput)`
  padding: 0.5rem;
  font-size: inherit;
  border: 2px solid var(--secondaryColor);
  background-color: var(--primaryColor);
  color: var(--secondaryColor);
  border-radius: 0.2rem;
  font-size: 1rem;
  &:focus {
    box-shadow: 0px 8px 30px -8px;
  }
  @media (max-width: 979px) {
    font-size: 1.2rem;
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

  return (
    <FormContainer aria-labelledby={formName} onSubmit={handleSubmit}>
      <label htmlFor="location"></label>
      <Input
        required
        id="location"
        name="location"
        type="text"
        defaultValue="Berlin"
      />

      <label htmlFor="date"></label>
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
          dateFormat={"yyyy/MM/dd"}
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
          dateFormat={"yyyy/MM/dd"}
        />
      </Wrapper>

      <label htmlFor="price"></label>
      <Wrapper>
        <StyledCurrencyInput
          id="price"
          name="price1"
          decimalsLimit={2}
          placeholder="min Price in €"
        />
        <StyledCurrencyInput
          id="price"
          name="price2"
          decimalsLimit={2}
          placeholder="max Price in €"
        />
      </Wrapper>

      <Wrapper>
        <StyledButton type="submit">Search</StyledButton>
      </Wrapper>
    </FormContainer>
  );
}
