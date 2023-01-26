import { useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Past from "./routes/Past";

function App() {
  // Initial settings for user (dark mode preference & tasks)
  useEffect(() => {
    if (localStorage.getItem("darkmode") === null) {
      // There is no dark mode setting yet, so set it as false
      localStorage.setItem("darkmode", false);
    }

    if (localStorage.getItem("initial") === null) {
      localStorage.setItem(
        "initial",
        JSON.stringify([
          {
            id: 0,
            name: "Workout 🦋",
            seconds: 0,
            active: false,
            firstTime: true,
          },
          {
            id: 1,
            name: "Uni study 🍰",
            seconds: 0,
            active: false,
            firstTime: true,
          },
          {
            id: 2,
            name: "Coding 🐝",
            seconds: 0,
            active: false,
            firstTime: true,
          },
          {
            id: 3,
            name: "Reading 🌊",
            seconds: 0,
            active: false,
            firstTime: true,
          },
        ])
      );
    }
  });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/past" element={<Past />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
