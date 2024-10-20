'use client'
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import OpenAI from "openai";



interface Recommendation {
    title: string;
    description: string;
}

function UserDataScreen() {
    const [userRecommendations, setUserRecommendations] = useState<Recommendation[]>([]);
    const [modalContent, setModalContent] = useState<Recommendation | null>(null);
    const apiKey = process.env.OPENAI_API_KEY; 

    // Parse the recommendations from the API response
    const parseUserRecommendations = (data: any): Recommendation[] => {
        return data.recommendations.map((item: any) => ({
            title: item.title,
            description: item.description
        }));
    };
    const [formData, setFormData] = useState({
        age: '',
        averageCycleLength: '',
        daysInCurrentCycle: '',
        currentPhase: '',
      });
    
      // This effect will only run on the client side, where localStorage is available
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
    

    // Generate user recommendations based on formData
    const generatesUserRecommendations = useCallback(async () => {
        
        try {
            const response = await axios.post(
                `https://api.openai.com/v1/chat/completions`,
                {
                    prompt: `Generate a list of recommended food items based on ${JSON.stringify(formData)}, give me descriptions in two sentences.`,
                    format: 'json'
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
                    }
                }
            );

            if (response.status === 200) {
                const parsedUserRecommendation = parseUserRecommendations(response.data);
                setUserRecommendations(parsedUserRecommendation);
            }
        } catch (error) {
            console.error('Error generating recommendations:', error);
        }
    }, [formData]);

    return (
        <div>
            <h2>Recommendations</h2>
            <button onClick={generatesUserRecommendations}>Get Recommendations</button>
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

export default UserDataScreen;

  