import React from "react";
import { useLazyFetch } from "../../utils/useLazyFetch";

export const CreateVehicleForm = () => {
  const [name, setName] = React.useState("");
  const [baseSpeed, setBaseSpeed] = React.useState("");
  const [baseHealth, setBaseHealth] = React.useState("");
  const [cost, setCost] = React.useState("");

  const [fetch, { error, loading, data }] = useLazyFetch(
    "http://localhost:4000/vehicles"
  );

  const onSubmit = () => {
    fetch("http://localhost:4000/vehicles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        baseSpeed: parseInt(baseSpeed),
        baseHealth: parseInt(baseHealth),
        cost: parseInt(cost),
      }),
    });
  };

  return (
    <div>
      <div>
        <label htmlFor="name">Name</label>
        <input
          className="border"
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
      </div>
      <div>
        <label htmlFor="baseSpeed">Base Speed</label>
        <input
          className="border"
          type="number"
          id="baseSpeed"
          value={baseSpeed}
          onChange={(e) => setBaseSpeed(e.currentTarget.value)}
        />
      </div>
      <div>
        <label htmlFor="baseHealth">Base Health</label>
        <input
          className="border"
          type="number"
          id="baseHealth"
          value={baseHealth}
          onChange={(e) => setBaseHealth(e.currentTarget.value)}
        />
      </div>
      <div>
        <label htmlFor="cost">Cost</label>
        <input
          className="border"
          type="text"
          id="cost"
          value={cost}
          onChange={(e) => setCost(e.currentTarget.value)}
        />
      </div>
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
};
