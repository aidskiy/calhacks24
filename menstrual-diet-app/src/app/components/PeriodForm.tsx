"use client";

import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { CalendarIcon } from "@heroicons/react/solid";
import "./calendarStyles.css";
import { useRouter } from "next/navigation"; // Import useRouter

const PeriodForm: React.FC = () => {
  const [dateRanges, setDateRanges] = useState<Date[][]>([[], [], []]); // initialize 3 periods
  const [currentRangeIndex, setCurrentRangeIndex] = useState(0);
  const [age, setAge] = useState<number | "">("");
  const router = useRouter(); // Initialize the router

  const handleDateChange = (value: Date[]) => {
    const newRanges = [...dateRanges];

    if (value.length === 2) {
      // selected 2 dates
      newRanges[currentRangeIndex] = value;
      setCurrentRangeIndex((prevIndex) => Math.min(prevIndex + 1, 2));
    }

    setDateRanges(newRanges);
  };

  const handleRangeClick = (index: number) => {
    setCurrentRangeIndex(index);
  };

  const calculateCycleInfo = () => {
    // Ensure we have at least two cycles to calculate the average cycle length
    const validRanges = dateRanges.filter((range) => range.length === 2);
    if (validRanges.length < 2) {
      return null;
    }

    // Get the start dates of the cycles
    const startDates = validRanges.map((range) => range[0]).sort((a, b) => a.getTime() - b.getTime());

    // Calculate cycle lengths between start dates
    const cycleLengths = [];
    for (let i = 1; i < startDates.length; i++) {
      const diffDays = (startDates[i].getTime() - startDates[i - 1].getTime()) / (1000 * 3600 * 24);
      cycleLengths.push(diffDays);
    }

    // Calculate average cycle length
    const averageCycleLength = cycleLengths.reduce((a, b) => a + b, 0) / cycleLengths.length;

    // Calculate number of days in the current menstrual cycle
    const lastStartDate = startDates[startDates.length - 1];
    const today = new Date();
    const daysInCurrentCycle = (today.getTime() - lastStartDate.getTime()) / (1000 * 3600 * 24);

    // Determine current menstrual phase
    let currentPhase = "";
    const cycleDay = Math.ceil(daysInCurrentCycle);
    if (cycleDay >= 1 && cycleDay <= 5) {
      currentPhase = "Menstrual Phase";
    } else if (cycleDay >= 6 && cycleDay <= 13) {
      currentPhase = "Follicular Phase";
    } else if (cycleDay === 14) {
      currentPhase = "Ovulation Phase";
    } else if (cycleDay >= 15 && cycleDay <= averageCycleLength) {
      currentPhase = "Luteal Phase";
    } else {
      currentPhase = "Unknown Phase";
    }

    return {
      averageCycleLength: Math.round(averageCycleLength),
      daysInCurrentCycle: Math.ceil(daysInCurrentCycle),
      currentPhase,
    };
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Ensure all date ranges are filled
    const allRangesFilled = dateRanges.every((range) => range.length === 2);
    if (!allRangesFilled) {
      alert("Please select all three menstrual cycles.");
      return;
    }

    const cycleInfo = calculateCycleInfo();

    // Save the values to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("dateRanges", JSON.stringify(dateRanges));
      localStorage.setItem("age", age.toString());

      if (cycleInfo) {
        localStorage.setItem("averageCycleLength", cycleInfo.averageCycleLength.toString());
        localStorage.setItem("daysInCurrentCycle", cycleInfo.daysInCurrentCycle.toString());
        localStorage.setItem("currentPhase", cycleInfo.currentPhase);
      }
    }

    // Navigate to the main page
    router.push("/report"); // Replace '/main' with your main page route
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
            {range.length === 2 && range.every((date) => date instanceof Date) ? (
              <span>
                {range[0].toISOString().substring(0, 10)} to {range[1].toISOString().substring(0, 10)}
              </span>
            ) : (
              <span className="text-gray-500"> Please mark the dates</span>
            )}
          </div>
        ))}
        <Calendar onChange={handleDateChange} selectRange={true} />
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
