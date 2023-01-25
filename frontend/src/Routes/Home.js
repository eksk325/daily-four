import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Home.module.css";

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

  return (
    <div className={dark ? styles.darkmode : styles.lightmode}>
      {loading ? (
        <div
          className={styles.loading}
          style={{ color: dark ? "white" : "black" }}
        >
          <h1>Loading...</h1>
        </div>
      ) : (
        <div>
          <div className={styles.banner}>
            <div className={styles.topRow}>
              <div onClick={switchToPast}>
                <i className="fa-regular fa-calendar"></i>
              </div>
              <div className={styles.greeting}>{greeting}</div>
              <div className={styles.switch} onClick={changeMode}>
                {dark ? (
                  <i className="fa-solid fa-circle-half-stroke"></i>
                ) : (
                  <i className="fa-regular fa-moon"></i>
                )}
              </div>
            </div>
            <div className={styles.time}>{time}</div>
            <div className={styles.date}>{date}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
