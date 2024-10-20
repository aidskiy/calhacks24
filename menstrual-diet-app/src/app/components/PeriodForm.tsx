"use client";

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import { CalendarIcon } from '@heroicons/react/solid';
import './calendarStyles.css'; 

const PeriodForm: React.FC = () => {
  const [dateRanges, setDateRanges] = useState<Date[][]>([[], [], []]); // initialize 3 periods
  const [currentRangeIndex, setCurrentRangeIndex] = useState(0);
  const [age, setAge] = useState<number | ''>('');
  

  const handleDateChange = (value: Date[]) => {
    const newRanges = [...dateRanges];

    if (value.length === 2) { // selecte 2 dates
      newRanges[currentRangeIndex] = value; 
      setCurrentRangeIndex((prevIndex) => Math.min(prevIndex + 1, 2)); 
    }

    setDateRanges(newRanges);
  };

  const handleRangeClick = (index: number) => {
    setCurrentRangeIndex(index); 
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // save the value：  dateRanges & age
    // switch to main page
    
  };

  return (
    <div className="bg-gradient-to-r from-rose-50 to-rose-200 min-h-screen flex items-center justify-center">
      <div className="absolute top-5 left-5">
      <img src="/images/plum.png" alt="Logo" className="h-32 w-auto" />
      </div>
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <h1 className="text-2xl font-bold">Hello Sugar Plumies💖 </h1>
      <p className="mb-2">Please mark the dates of your last three menstrual cycles</p>
      {dateRanges.map((range, index) => (
        <div key={index} className="flex items-center cursor-pointer" onClick={() => handleRangeClick(index)}>
          <CalendarIcon className="h-6 w-6 text-[#b1799c] hover:text-[#600830] transition duration-200" />
          {range.length === 2 && range.every(date => date instanceof Date) ? ( 
            <span>
              {range[0].toISOString().substring(0, 10)} to {range[1].toISOString().substring(0, 10)}
            </span>
          ) : (
            <span className="text-gray-500"> Please mark the dates</span>
          )}
        </div>
      ))}
      <Calendar
        onChange={handleDateChange}
        selectRange={true} 
      />
      <label className="flex flex-col">
        Your Age:
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          className="border border-gray-300 p-2"
          required
        />
      </label>
      <button type="submit" className="bg-[#ff6f61] text-white p-2 rounded-lg hover:bg-[#a07c8d] transition duration-200">
        Submit
      </button>
    </form>
  </div>
  );
};

export default PeriodForm;
