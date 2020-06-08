import React from "react";
import { useFetch } from "../../utils/useFetch";

export const ListPews = () => {
  const { loading, error, data } = useFetch("http://localhost:4000/pews");
  return (
    <div>
      <pre>{JSON.stringify({ loading, error, data }, null, 2)}</pre>
    </div>
  );
};
