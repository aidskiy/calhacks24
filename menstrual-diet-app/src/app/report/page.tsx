"use client";

import React, { useEffect, useState } from "react";
import UserDataScreen from "../components/UserDataScreen";

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

const getNutritionRecommendation = (day) => {
  if (day >= 1 && day <= 5) {
    return "During the Menstrual Phase (days 1-5), focus on foods rich in iron and vitamin C, like spinach, lean red meat, oranges, and berries to replenish lost nutrients.";
  } else if (day >= 6 && day <= 14) {
    return "In the Follicular Phase (days 6-14), prioritize complex carbs and lean proteins, such as whole grains, quinoa, eggs, and chicken. This helps boost energy levels.";
  } else if (day >= 15 && day <= 17) {
    return "During the Ovulation Phase (days 15-17), include foods rich in antioxidants, such as nuts, seeds, and dark chocolate. Omega-3 fatty acids from fish can also support hormone balance.";
  } else if (day >= 18 && day <= 28) {
    return "In the Luteal Phase (days 18-28), focus on magnesium-rich foods, such as dark leafy greens, bananas, and avocados. This helps reduce bloating and mood swings.";
  } else {
    return "No specific recommendations available.";
  }
};

export default function ReportPage() {
  const [weight, setWeight] = useState(null);
  const [age, setAge] = useState(null);
  const [averageCycleLength, setAverageCycleLength] = useState(null);
  const [daysInCurrentCycle, setDaysInCurrentCycle] = useState(null);
  const [currentPhase, setCurrentPhase] = useState("Unknown Phase");
  const [nutritionRecommendation, setNutritionRecommendation] = useState("");

  useEffect(() => {
    // Retrieve data from localStorage
    const storedAge = localStorage.getItem("age");
    const storedAverageCycleLength = localStorage.getItem("averageCycleLength");
    const storedDaysInCurrentCycle = localStorage.getItem("daysInCurrentCycle");
    const storedCurrentPhase = localStorage.getItem("currentPhase");

    // Set state with retrieved data
    if (storedAge) setAge(storedAge);
    if (storedAverageCycleLength) setAverageCycleLength(storedAverageCycleLength);
    if (storedDaysInCurrentCycle) setDaysInCurrentCycle(storedDaysInCurrentCycle);
    if (storedCurrentPhase) setCurrentPhase(storedCurrentPhase);

    // Set nutrition recommendation based on the current day in the cycle
    if (storedDaysInCurrentCycle) {
      setNutritionRecommendation(getNutritionRecommendation(Number(storedDaysInCurrentCycle)));
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-rose-50 to-rose-200 p-6">
      <h1 className="text-2xl font-bold mb-4">Menstrual Cycle Report</h1>
      <div className={`w-40 h-40 rounded-full mb-6 ${getPhaseColor(currentPhase)} flex items-center justify-center`}>
        <span className="text-white font-bold">{currentPhase}</span>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-lg mb-6">
        <h2 className="text-lg font-semibold mb-2">User Information</h2>
        <ul className="space-y-2">
          <li className="text-gray-700">Age: {age ? `${age} years` : "N/A"}</li>
          <li className="text-gray-700">Average Cycle Length: {averageCycleLength ? `${averageCycleLength} days` : "N/A"}</li>
          <li className="text-gray-700">Days in Current Cycle: {daysInCurrentCycle ? `${daysInCurrentCycle} days` : "N/A"}</li>
          <li className="text-gray-700">Current Phase: {currentPhase}</li>
        </ul>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-lg">
        <h2 className="text-lg font-semibold mb-2">Nutrition Recommendation</h2>
        <p className="text-gray-700">{nutritionRecommendation}</p>
      </div>
      <UserDataScreen />
    </div>
    
  );
}
