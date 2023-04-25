import styled from "styled-components";
import { useState } from "react";
import { StyledButton } from "./StyledButton";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// import RangeSlider from 'react-range-slider-input';
// import 'react-range-slider-input/dist/style.css';

// import Box from '@mui/material/Box';
// import Slider from '@mui/material/Slider';

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

// const StyledRangeSlider = styled(RangeSlider)`
//   background-color: #f3e8d7;
// `




export default function SearchForm({ onSubmit, formName, onClick }: any) {
  function handleSubmit(event: any) {
    event.preventDefault();
    onSubmit(event);
  }

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [value, setValue] = useState([0, 100]);
  console.log(value);
  


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

      {/* <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        // onChange={handleChange}
        valueLabelDisplay="auto"
        // getAriaValueText={valuetext}
      />
    </Box> */}


      {/* <StyledRangeSlider
        rangeSlideDisabled={true}
        value={value} 
        onInput={setValue}
        id="price"
        name="price"
      /> */}

     {/* <div>
      <Input
        id="price"
        name="price1"
        type="range"
        // defaultValue={}
      />
      <Input
        id="price"
        name="price2"
        type="range"
        // defaultValue={}
      />
      </div> */}

      <StyledButton type="submit" onClick={onClick}>
        Search
      </StyledButton>
    </FormContainer>
  );
}
