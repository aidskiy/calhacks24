// src/app/page.tsx
import React from 'react';
import UserDataScreen from './components/UserDataScreen';

const HomePage: React.FC = () => {
  return (
    <div className="p-4">
      <UserDataScreen />
      
    </div>
  );
};

export default HomePage;
