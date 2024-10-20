import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  startDate: Date;
  endDate: Date;
}

// Komponent CountdownTimer służy do wyświetlania odliczania czasu między dwiema datami
// Aby użyć tego komponentu, należy przekazać dwie daty w formacie:
// new Date('RRRR-MM-DD')
// gdzie RRRR to rok, MM to miesiąc (01-12), a DD to dzień (01-31)
// Przykład: <CountdownTimer startDate={new Date('2024-10-17')} endDate={new Date('2025-01-30')} />

const CountdownTimer: React.FC<CountdownTimerProps> = ({ startDate, endDate }) => {
  const [timeLeft, setTimeLeft] = useState<Record<string, number>>({});
  //const [progress, setProgress] = useState(0);

  function calculateTimeLeft() {
    const now = new Date();
    const difference = +endDate - +now;
    //const totalDuration = +endDate - +startDate;
    let newTimeLeft: Record<string, number> = {};

    if (difference > 0) {
      newTimeLeft = {
        dni: Math.floor(difference / (1000 * 60 * 60 * 24)),
        godziny: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minuty: Math.floor((difference / 1000 / 60) % 60),
        sekundy: Math.floor((difference / 1000) % 60),
      };
      //setProgress(((totalDuration - difference) / totalDuration) * 100);
    } else {
      //setProgress(100);
    }

    return newTimeLeft;
  }

  useEffect(() => {
    function updateTimer() {
      setTimeLeft(calculateTimeLeft());
    }

    updateTimer(); // Natychmiastowe wywołanie, aby uniknąć opóźnienia przy pierwszym renderowaniu
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [endDate, startDate]);

  const timerComponents = Object.entries(timeLeft).map(([interval, value]) => (
    <span key={interval}>
      {value} {interval}{" "}
    </span>
  ));

  return (
    <div>
      <div>
        {timerComponents.length ? timerComponents : <span>Czas się skończył!</span>}
      </div>
    </div>
  );
};

export default CountdownTimer;