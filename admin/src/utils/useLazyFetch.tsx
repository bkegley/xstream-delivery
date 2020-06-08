import React from "react";

interface FetchState {
  loading: boolean;
  error: any;
  data: any;
}

interface Action {
  type: "FETCH_INIT" | "FETCH_ERROR" | "FETCH_SUCCESS" | "REFETCH";
  payload?: any;
}

const reducer = (state, action: Action) => {
  switch (action.type) {
    case "FETCH_INIT": {
      console.log("we are fetchign!!!");
      return {
        loading: true,
        error: null,
        data: null,
      };
    }

    case "FETCH_ERROR": {
      return {
        loading: false,
        error: action.payload,
        data: null,
      };
    }

    case "FETCH_SUCCESS": {
      return {
        loading: false,
        data: action.payload,
        error: null,
      };
    }

    case "REFETCH": {
      return {
        ...state,
        loading: true,
      };
    }
  }
};

const initialState: FetchState = {
  loading: false,
  error: null,
  data: null,
};

export const useLazyFetch = (
  initialUrl,
  initialParams = {}
): [Function, FetchState] => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [url, setUrl] = React.useState(initialUrl);
  const [params, setParams] = React.useState(initialParams);

  const [shouldFetch, setShouldFetch] = React.useState(false);

  React.useEffect(() => {
    if (shouldFetch) {
      setShouldFetch(false);
      dispatch({ type: "FETCH_INIT" });
      fetch(url, params)
        .then((res) => res.json())
        .then((res) => {
          dispatch({ type: "FETCH_SUCCESS", payload: res });
        })
        .catch((err) => {
          dispatch({ type: "FETCH_ERROR", payload: err });
        });
    }
  }, [shouldFetch]);

  const refetch = React.useCallback((url, params) => {
    if (url) {
      setUrl(url);
    }
    if (params) {
      setParams(params);
    }

    setShouldFetch(true);
  }, []);

  return [refetch, state];
};
