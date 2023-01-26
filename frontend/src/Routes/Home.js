import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Home.module.css";
import Task from "../js/Task";

function Home() {
  const [greeting, setGreeting] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);

  const [darkmode, setDarkmode] = useState(
    localStorage.getItem("darkmode") === true
  );

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
  }, []);

  const changeMode = () => {
    if (darkmode) {
      setDarkmode(false);
      localStorage.setItem("darkmode", false);
    } else {
      setDarkmode(true);
      localStorage.setItem("darkmode", true);
    }
  };

  const switchToPast = () => {
    navigate("/past");
  };

  return (
    <div className={darkmode ? styles.darkmode : styles.lightmode}>
      {loading ? (
        <div
          className={styles.loading}
          style={{ color: darkmode ? "white" : "black" }}
        >
          <h1>Loading...</h1>
        </div>
      ) : (
        <div>
          <div className={styles.switch} onClick={changeMode}>
            {darkmode ? (
              <i className="fa-solid fa-circle-half-stroke"></i>
            ) : (
              <i className="fa-regular fa-moon"></i>
            )}
          </div>
          <div className={styles.banner}>
            <div className={styles.topRow}>
              <div className={styles.greeting}>{greeting}</div>
            </div>
            <div className={styles.time}>{time}</div>
            <div className={styles.date}>{date}</div>
          </div>
          <Task date={date} darkmode={darkmode} />
        </div>
      )}
    </div>
  );
}

export default Home;
