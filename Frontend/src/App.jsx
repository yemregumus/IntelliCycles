import { useEffect, useState } from "react";
import { getHealthCheck } from "../api";
import { Home } from "./pages";

function App() {
  const [health, setHealth] = useState();

  useEffect(() => {
    getHealthCheck()
      .then((data) => setHealth(data?.body))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <h1>Welcome</h1>
      <Home/>
      <h2 className="underline">{health}</h2>
    </>
  );
}

export default App;
