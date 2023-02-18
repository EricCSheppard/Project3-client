import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Advice() {
  const [advice, setAdvice] = useState('');
  const [textColor, setTextColor] = useState('');

  useEffect(() => {
    const loadEverytime = () => {
      axios.get('https://type.fit/api/quotes')
        .then(response => {
          const data = response.data;
          const randomIndex = Math.floor(Math.random() * data.length);
          const randomQuote = data[randomIndex];
          setAdvice(randomQuote.text);
          setTextColor(getRandomGoldOrDiamondColor()); // Set a random gold or diamond color
        })
        .catch(error => {
          console.error(error);
        });
    };

    loadEverytime(); // Initial fetch
    const interval = setInterval(loadEverytime, 10000); // Fetch every 10 seconds

    return () => {
      clearInterval(interval); // Clean up the interval on unmount
    };
  }, []);

  const getRandomGoldOrDiamondColor = () => {
    const colors = ['#ffd700', '#ffdf00', '#e6e8fa', '#b9f2ff', '#f0e68c', '#f5deb3'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div style={{ backgroundColor: '#333' }}>
      <p style={{ color: textColor }}> {advice}</p>
    </div>
  );
}

export default Advice;
