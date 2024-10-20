import axios from 'axios';

// Utility function to generate user recommendations
export const generatesUserRecommendations = async (formData: {
  age: string;
  averageCycleLength: string;
  daysInCurrentCycle: string;
  currentPhase: string;
}) => {
  try {
    const response = await axios.post(
      `https://api.openai.com/v1/chat/completions`,
      {
        model: 'gpt-3.5-turbo', // Ensure the model is provided
        messages: [
          {
            role: 'system',
            content: 'You are a nutritionist.',
          },
          {
            role: 'user',
            content: `Based on a person who is ${formData.age} years old, in the ${formData.currentPhase} of their menstrual cycle, on day ${formData.daysInCurrentCycle} of a cycle that lasts an average of ${formData.averageCycleLength} days, generate nutrition recommendations. Please provide specific food items or nutrients they should focus on during this phase and explain why they are beneficial during this phase.`,
          },
        ],
        max_tokens: 100, // Specify max tokens if you want
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`, // Use NEXT_PUBLIC for client-side env variables
        },
      }
    );

    if (response.status === 200) {
      const parsedUserRecommendation = parseUserRecommendations(response.data);
      return parsedUserRecommendation;
    } else {
      throw new Error('Failed to fetch recommendations');
    }
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return [];
  }
};

// Example parsing function (you can adapt it)
const parseUserRecommendations = (data: any) => {
  if (data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
    return JSON.parse(data.choices[0].message.content);
  }
  return [];
};
