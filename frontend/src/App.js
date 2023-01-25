import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Past from "./Routes/Past";

function App() {
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
