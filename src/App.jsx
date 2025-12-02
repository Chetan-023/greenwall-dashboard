import { useEffect, useState } from "react";
import { db } from "./firebase";
import { ref, onValue, update } from "firebase/database";
import "./App.css";

function App() {
  const [sensor, setSensor] = useState({});
  const [control, setControl] = useState({});

  useEffect(() => {
    const sensorRef = ref(db, "greenwall/data");
    const controlRef = ref(db, "greenwall/control");

    onValue(sensorRef, (snap) => setSensor(snap.val() || {}));
    onValue(controlRef, (snap) => setControl(snap.val() || {}));
  }, []);

  const autoMode = control?.autoMode === true;

  const setPump = (state) =>
    update(ref(db, "greenwall/control"), { pump: state });

  const setFan = (state) =>
    update(ref(db, "greenwall/control"), { fan: state });

  const setLED = (state) =>
    update(ref(db, "greenwall/control"), { led: state });

  const toggleAutoMode = () =>
    update(ref(db, "greenwall/control"), { autoMode: !autoMode });

  return (
    <div className="container">
      <h1 className="title">🌱 IoT GreenWall Dashboard</h1>

      <div className="card">
        <h2>📊 Sensor Data</h2>

        <p>🌡 Temperature: {sensor.temperature} °C</p>
        <p>💧 Humidity: {sensor.humidity} %</p>
        <p>💡 Light: {sensor.light} %</p>
        <p>🌿 Moisture: {sensor.moisture} %</p>
        <p>💦 Water: {sensor.water} %</p>
        <p>🌫 Dust: {sensor.dust} µg/m³</p>
        <p>🫁 CO₂: {sensor.co2} ppm</p>

        <h2>⚙️ Controls</h2>

        <button
          className={autoMode ? "btn green" : "btn grey"}
          onClick={toggleAutoMode}
        >
          Auto Mode: {autoMode ? "ON" : "OFF"}
        </button>

        <div className="row">
          <button className="btn blue" disabled={autoMode} onClick={() => setPump("ON")}>Pump ON</button>
          <button className="btn red"  disabled={autoMode} onClick={() => setPump("OFF")}>Pump OFF</button>
        </div>

        <div className="row">
          <button className="btn blue" disabled={autoMode} onClick={() => setFan("ON")}>Fan ON</button>
          <button className="btn red"  disabled={autoMode} onClick={() => setFan("OFF")}>Fan OFF</button>
        </div>

        <div className="row">
          <button className="btn blue" disabled={autoMode} onClick={() => setLED("ON")}>LED ON</button>
          <button className="btn red"  disabled={autoMode} onClick={() => setLED("OFF")}>LED OFF</button>
        </div>
      </div>
    </div>
  );
}

export default App;
