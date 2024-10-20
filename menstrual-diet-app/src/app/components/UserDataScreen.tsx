"use client"; // Mark this as a client-side component

import React, { useCallback, useEffect, useState } from 'react';
import { generatesUserRecommendations } from '../components/utils'; // Import the utility function

interface Recommendation {
  title: string;
  description: string;
}

export default function UserDataScreen() {
  const [userRecommendations, setUserRecommendations] = useState<Recommendation[]>([]);
  
  const [formData, setFormData] = useState({
    age: '',
    averageCycleLength: '',
    daysInCurrentCycle: '',
    currentPhase: '',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const age = localStorage.getItem('age');
      const averageCycleLength = localStorage.getItem('averageCycleLength');
      const daysInCurrentCycle = localStorage.getItem('daysInCurrentCycle');
      const currentPhase = localStorage.getItem('currentPhase');

      setFormData({
        age: age || '',
        averageCycleLength: averageCycleLength || '',
        daysInCurrentCycle: daysInCurrentCycle || '',
        currentPhase: currentPhase || '',
      });
    }
  }, []);

  // Handle generating user recommendations
  const handleGenerateRecommendations = useCallback(async () => {
    const recommendations = await generatesUserRecommendations(formData); // Call the utility function
    setUserRecommendations(recommendations); // Store the recommendations
  }, [formData]);

  return (
    <div>
      <h2>Nutrition Recommendations Based on Menstrual Cycle</h2>
      <button onClick={handleGenerateRecommendations}>Get Recommendations</button>
      <ul>
        {userRecommendations.map((rec, index) => (
          <li key={index}>
            <h3>{rec.title}</h3>
            <p>{rec.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}




  