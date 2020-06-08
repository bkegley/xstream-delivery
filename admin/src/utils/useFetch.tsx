import React from "react";
import { useLazyFetch } from "./useLazyFetch";

export const useFetch = (url, params = {}) => {
  const [fetch, state] = useLazyFetch(url, params);

  React.useEffect(() => {
    fetch();
  }, []);

  return state;
};
