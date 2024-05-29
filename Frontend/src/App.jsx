import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { getHealthCheck } from "../api";
import { Home, Register, Add, Welcome } from "./pages";
import { NavBar } from "./components";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [health, setHealth] = useState('');

  useEffect(() => {
    getHealthCheck()
      .then((data) => setHealth(data?.body))
      .catch((error) => console.error('Health check failed:', error));
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-r from-[#540056] to-[#000C4B]">
        <NavBar />
        <Routes>
          <Route path="/" element= {<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/add" element={<Add />} />
          {/* <Route path="/tasks" element={<Tasks />} />
          <Route path="/reminders" element={<Reminders />} />
          <Route path="/habits" element={<Habits />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/account" element={<Account />} /> */}
          <Route path="/register" element={<Register />} />
        </Routes>
        <h2 className="underline text-white">{health}</h2>
      </div>
    </Router>
  );
}

export default App;
