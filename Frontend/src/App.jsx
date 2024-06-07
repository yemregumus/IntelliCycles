import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { getHealthCheck } from "../api";
import { Home, Register, Add, Welcome, Tasks, Reminders, Habits, 
  Event, Account, IntelliWand, SignIn } from "./pages";
import { NavBar } from "./components";
import { Toaster } from "react-hot-toast";
import 'bootstrap/dist/css/bootstrap.min.css';
import RouteGuard from "./components/RouteGuard";

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
        <Toaster position='bottom-right' toastOptions={{ duration: 3000 }} />
        <Routes>
          <Route path="/" element= {<Welcome />} />
          <Route path="/home" element={<RouteGuard><Home /></RouteGuard>} />
          <Route path="/tasks" element={<RouteGuard><Tasks /></RouteGuard>} />
          <Route path="/reminders" element={<RouteGuard><Reminders /></RouteGuard>} />
          <Route path="/habits" element={<RouteGuard><Habits /></RouteGuard>} />
          <Route path="/calendar" element={<RouteGuard><Event /></RouteGuard>} />
          <Route path="/add/:type" element={<RouteGuard><Add /></RouteGuard>} />
          <Route path="/account" element={<RouteGuard><Account /></RouteGuard>} />
          <Route path="/intelliwand" element={<RouteGuard><IntelliWand /></RouteGuard>} />
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
        <h2 className="underline text-white">{health}</h2>
      </div>
    </Router>
  );
}

export default App;
