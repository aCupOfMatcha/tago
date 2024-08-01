import { useState, useEffect } from'react';

function TimeDisplay() {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <p>当前时间: {currentTime}</p>
    </div>
  );
}

export default TimeDisplay;