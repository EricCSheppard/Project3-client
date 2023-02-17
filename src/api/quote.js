import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Advice() {
    const [advice, setAdvice] = useState('');

    useEffect(() => {
        const loadEverytime = () => {
        axios.get('https://api.adviceslip.com/advice')
            .then(response => {
            setAdvice(response.data.slip.advice);
            })
            .catch(error => {
            console.error(error)
            })
        }

        loadEverytime(); // Initial fetch
        const interval = setInterval(loadEverytime, 8000); // Fetch every 08 seconds

        return () => {
        clearInterval(interval); // Clean up the interval on unmount
        }
    }, [])

    return (
        <div>
        <h4 style={{fontFamily: 'Bad Script, cursive'}}> {advice}</h4>
        </div>
    )
}

export default Advice