import React from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../../utils/useFetch";

export const Other = () => {
  const { error, loading, data } = useFetch("http://localhost:4000/pews");
  return (
    <div>
      <h2>Other page!</h2>
      <pre>{JSON.stringify({ loading, data, error }, null, 2)}</pre>
    </div>
  );
};
