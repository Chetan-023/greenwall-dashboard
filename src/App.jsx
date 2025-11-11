import { useEffect, useState } from "react";
import { ref, onValue, set } from "firebase/database";
import { db } from "./firebase";
import "./index.css";

export default function App() {
  const [data, setData] = useState({});
  const [control, setControl] = useState({});

  useEffect(() => {
    onValue(ref(db, "greenwall/data"), (snapshot) => {
      setData(snapshot.val() || {});
    });
    onValue(ref(db, "greenwall/control"), (snapshot) => {
      setControl(snapshot.val() || {});
    });
  }, []);

  const togglePump = (state) => set(ref(db, "greenwall/control/pump"), state);
  const toggleAuto = () =>
    set(ref(db, "greenwall/control/autoMode"), !control.autoMode);

  if (!data || !control)
    return <div className="dashboard">Loading data...</div>;

  return (
    <div className="dashboard">
      <h1>🌿 IoT GreenWall Dashboard</h1>

      <div className="section">
        <h2>📊 Sensor Data</h2>
        <ul>
          <li>🌡️ Temperature: {data.temperature} °C</li>
          <li>💧 Humidity: {data.humidity} %</li>
          <li>💡 Light: {data.light} %</li>
          <li>🌱 Soil Moisture: {data.moisture} %</li>
          <li>🌫 Dust: {data.dust} µg/m³</li>
          <li>🫁 CO₂: {data.co2} ppm</li>
          <li>💦 Pump: {data.pump}</li>
          <li>🌀 Fan: {data.fan}</li>
          <li>💡 LED: {data.led}</li>
        </ul>
      </div>

      <div className="section">
        <h2>⚙️ Controls</h2>
        <button
          onClick={toggleAuto}
          className={control.autoMode ? "btn green" : "btn gray"}
        >
          Auto Mode: {control.autoMode ? "ON" : "OFF"}
        </button>

        <button
          onClick={() => togglePump("ON")}
          className="btn blue"
          disabled={control.autoMode}
        >
          Pump ON
        </button>
        <button
          onClick={() => togglePump("OFF")}
          className="btn red"
          disabled={control.autoMode}
        >
          Pump OFF
        </button>
      </div>

      <footer>© {new Date().getFullYear()} GreenWall IoT</footer>
    </div>
  );
}
