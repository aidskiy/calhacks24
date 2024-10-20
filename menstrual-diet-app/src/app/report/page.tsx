"use client";

import React, { useEffect, useState } from "react";

const getPhaseColor = (phase) => {
  switch (phase) {
    case "Menstrual Phase":
      return "bg-red-500";
    case "Follicular Phase":
      return "bg-blue-500";
    case "Ovulation Phase":
      return "bg-green-500";
    case "Luteal Phase":
      return "bg-yellow-500";
    default:
      return "bg-gray-400";
  }
};

export default function ReportPage() {
  const [weight, setWeight] = useState(null);
  const [age, setAge] = useState(null);
  const [averageCycleLength, setAverageCycleLength] = useState(null);
  const [daysInCurrentCycle, setDaysInCurrentCycle] = useState(null);
  const [currentPhase, setCurrentPhase] = useState("Unknown Phase");

  useEffect(() => {
    // Retrieve data from localStorage
    const storedWeight = localStorage.getItem("weight");
    const storedAge = localStorage.getItem("age");
    const storedAverageCycleLength = localStorage.getItem("averageCycleLength");
    const storedDaysInCurrentCycle = localStorage.getItem("daysInCurrentCycle");
    const storedCurrentPhase = localStorage.getItem("currentPhase");

    // Set state with retrieved data
    if (storedAge) setAge(storedAge);
    if (storedAverageCycleLength) setAverageCycleLength(storedAverageCycleLength);
    if (storedDaysInCurrentCycle) setDaysInCurrentCycle(storedDaysInCurrentCycle);
    if (storedCurrentPhase) setCurrentPhase(storedCurrentPhase);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-rose-50 to-rose-200 p-6">
      <h1 className="text-2xl font-bold mb-4">Menstrual Cycle Report</h1>
      <div className={`w-40 h-40 rounded-full mb-6 ${getPhaseColor(currentPhase)} flex items-center justify-center`}>
        <span className="text-white font-bold">{currentPhase}</span>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-lg">
        <h2 className="text-lg font-semibold mb-2">User Information</h2>
        <ul className="space-y-2">
          <li className="text-gray-700">Age: {age ? `${age} years` : "N/A"}</li>
          <li className="text-gray-700">Average Cycle Length: {averageCycleLength ? `${averageCycleLength} days` : "N/A"}</li>
          <li className="text-gray-700">Days in Current Cycle: {daysInCurrentCycle ? `${daysInCurrentCycle} days` : "N/A"}</li>
          <li className="text-gray-700">Current Phase: {currentPhase}</li>
        </ul>
      </div>
    </div>
  );
}
