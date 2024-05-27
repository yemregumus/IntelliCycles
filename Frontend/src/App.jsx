import { useEffect, useState } from "react";
import { getHealthCheck } from "../api";
import { Home } from "./pages";
import { NavBar } from "./components";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [health, setHealth] = useState();

  useEffect(() => {
    getHealthCheck()
      .then((data) => setHealth(data?.body))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-[#540056] to-[#000C4B]">
        <NavBar />
        <Home />
        <h2 className="underline text-white">{health}</h2>
      </div>
    </>
  );
}

export default App;
