import React from "react";
import { useFetch } from "../../utils/useFetch";

export const ListVehicles = () => {
  const { error, loading, data } = useFetch("http://localhost:4000/vehicles");
  return (
    <div>
      <h1>List em!</h1>
      <pre>{JSON.stringify({ loading, data, error }, null, 2)}</pre>
    </div>
  );
};
