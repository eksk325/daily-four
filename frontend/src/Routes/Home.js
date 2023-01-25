import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [greeting, setGreeting] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);

  // GET DARK MODE SETTINGS FROM DATABASE !!!
  const [dark, setDark] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Updating the current greeting message, time, and date every second on the interface.
    setInterval(() => {
      const currentDate = new Date();

      // Finding out if it's currently morning, afternoon, or evening to assign the appropriate greeting
      const currentHour = currentDate.getHours();

      if (currentHour >= 0 && currentHour < 12) {
        // Good morning
        setGreeting("おはよう");
      } else if (currentHour < 18) {
        // Good afternoon
        setGreeting("こんにちは");
      } else {
        // Good evening
        setGreeting("こんばんは");
      }

      // Setting the clock time
      setTime(
        currentDate.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );

      // Setting the date in Korean style
      setDate(currentDate.toLocaleDateString("ko-KR"));

      // After all time components are loaded, set loading to false
      setLoading(false);
    }, 1000);
  });

  const changeMode = () => {
    dark ? setDark(false) : setDark(true);
    // UPDATE DARK MODE SETTINGS TO DATABASE !!!!
  };

  const switchToPast = () => {
    navigate("/past");
  };

  return <div></div>;
}

export default Home;
